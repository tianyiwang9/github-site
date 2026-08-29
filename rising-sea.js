(function () {
  const config = window.risingSeaConfig || {};
  const githubConfig = config.github || {};
  const solutions = Array.isArray(window.risingSeaSolutions)
    ? window.risingSeaSolutions
    : [];

  const list = document.querySelector("[data-solution-list]");
  const empty = document.querySelector("[data-empty-solutions]");
  const searchInput = document.querySelector("[data-search]");
  const searchStatus = document.querySelector("[data-search-status]");
  const solutionCount = document.querySelector("[data-solution-count]");
  const editor = document.querySelector("[data-editor]");
  const preview = document.querySelector("[data-preview]");
  const titleInput = document.querySelector("[data-title]");
  const chapterInput = document.querySelector("[data-chapter]");
  const problemInput = document.querySelector("[data-problem]");
  const dateInput = document.querySelector("[data-date]");
  const authorInput = document.querySelector("[data-author]");
  const insertImageButton = document.querySelector("[data-insert-image]");
  const imageUploadInput = document.querySelector("[data-image-upload]");
  const imageStatus = document.querySelector("[data-image-status]");
  const newSolutionButton = document.querySelector("[data-new-solution]");
  const publishButton = document.querySelector("[data-publish-entry]");
  const resetButton = document.querySelector("[data-reset-draft]");
  const tokenInput = document.querySelector("[data-github-token]");
  const saveTokenButton = document.querySelector("[data-save-token]");
  const downloadTexButton = document.querySelector("[data-download-tex]");
  const clearTokenButton = document.querySelector("[data-clear-token]");
  const status = document.querySelector("[data-status]");
  const publishStatus = document.querySelector("[data-publish-status]");
  const toastRegion = document.querySelector("[data-toast-region]");
  const collaboratorRequestForm = document.querySelector("[data-collaborator-request-form]");
  const collaboratorRequestStatus = document.querySelector("[data-collaborator-request-status]");
  const collaboratorRequestSubmit = document.querySelector("[data-collaborator-request-submit]");
  const storageKey = "rising-sea-draft";
  const tokenStorageKey = "rising-sea-github-token";
  const authorStorageKey = "rising-sea-author";
  const hiddenStorageKey = "rising-sea-hidden-solutions";
  const localSolutionsStorageKey = "rising-sea-local-solutions";
  const localTexStorageKey = "rising-sea-latest-tex";
  const remoteSolutionIds = new Set(solutions.map((solution) => solution.id));
  const texDisplayEnvironments = new Set([
    "align",
    "align*",
    "alignat",
    "alignat*",
    "equation",
    "equation*",
    "flalign",
    "flalign*",
    "gather",
    "gather*",
    "multline",
    "multline*"
  ]);
  let refreshingSolutions = false;
  let editingSolutionId = "";
  let toastTimer = null;

  function getGithubToken() {
    return localStorage.getItem(tokenStorageKey) || "";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function decodeHtmlEntities(value) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = String(value);
    return textarea.value;
  }

  function normalize(value) {
    return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function normalizeCompact(value) {
    return normalize(value).replace(/[^a-z0-9]+/g, "");
  }

  function normalizeGithubAccount(value) {
    return String(value || "")
      .trim()
      .replace(/^@/, "")
      .replace(/^https?:\/\/(?:www\.)?github\.com\//i, "")
      .replace(/^github\.com\//i, "")
      .split(/[/?#]/)[0]
      .replace(/^@/, "")
      .trim();
  }

  function isGithubAccount(value) {
    return /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(value);
  }

  function letterSortValue(value) {
    const letters = String(value || "").toUpperCase().replace(/[^A-Z]/g, "");
    if (!letters) return 0;

    return letters.split("").reduce((total, letter) => (
      total * 26 + letter.charCodeAt(0) - 64
    ), 0);
  }

  function parseProblemReference(solution) {
    const chapterText = String(solution && solution.chapter || "");
    const problemText = String(solution && solution.problem || "");
    const chapterMatch = chapterText.match(/\d+/);
    const problemMatch = problemText.match(/(\d+)\s*[.-]\s*(\d+)\s*(?:[.-]|\s+)?\s*([a-z]+)?/i);
    let chapter = chapterMatch ? Number(chapterMatch[0]) : NaN;
    let section = NaN;
    let letter = "";

    if (problemMatch) {
      chapter = Number(problemMatch[1]);
      section = Number(problemMatch[2]);
      letter = (problemMatch[3] || "").toUpperCase();
    } else {
      const problemNumbers = problemText.match(/\d+/g) || [];
      if (problemNumbers.length >= 2) {
        chapter = Number(problemNumbers[0]);
        section = Number(problemNumbers[1]);
      } else if (problemNumbers.length === 1) {
        section = Number(problemNumbers[0]);
      }

      const letterMatch = problemText.match(/([a-z]+)\s*$/i);
      letter = letterMatch ? letterMatch[1].toUpperCase() : "";
    }

    return {
      chapter,
      section,
      letter,
      hasStructuredProblem: Number.isFinite(chapter) && Number.isFinite(section),
      rawChapter: normalizeCompact(chapterText),
      rawProblem: normalizeCompact(problemText),
      raw: normalize([chapterText, problemText, solution && solution.title].filter(Boolean).join(" "))
    };
  }

  function problemKey(solution) {
    const parts = parseProblemReference(solution);
    if (parts.hasStructuredProblem) {
      return `${parts.chapter}.${parts.section}.${parts.letter}`;
    }

    return [parts.rawChapter, parts.rawProblem].filter(Boolean).join(".");
  }

  function compareNumbers(left, right) {
    const safeLeft = Number.isFinite(left) ? left : Number.MAX_SAFE_INTEGER;
    const safeRight = Number.isFinite(right) ? right : Number.MAX_SAFE_INTEGER;
    return safeLeft - safeRight;
  }

  function compareSolutionsByProblem(left, right) {
    const leftParts = parseProblemReference(left);
    const rightParts = parseProblemReference(right);
    const byChapter = compareNumbers(leftParts.chapter, rightParts.chapter);
    if (byChapter) return byChapter;

    const bySection = compareNumbers(leftParts.section, rightParts.section);
    if (bySection) return bySection;

    const byLetter = letterSortValue(leftParts.letter) - letterSortValue(rightParts.letter);
    if (byLetter) return byLetter;

    return leftParts.raw.localeCompare(rightParts.raw, undefined, {
      numeric: true,
      sensitivity: "base"
    });
  }

  function sortSolutionsByProblem(entries) {
    return entries.slice().sort(compareSolutionsByProblem);
  }

  function isRelativePath(value) {
    return /^[./a-z0-9_-]/i.test(value) && !/^[a-z][a-z0-9+.-]*:/i.test(value);
  }

  function cleanRelativePath(value) {
    return String(value || "").replace(/^\.?\//, "");
  }

  function isUploadedImagePath(value) {
    const imageFolder = githubConfig.imagesPath || "rising-sea-images";
    const cleanPath = cleanRelativePath(value);
    return cleanPath === imageFolder || cleanPath.startsWith(`${imageFolder}/`);
  }

  function rawGithubAssetUrl(path) {
    if (!githubConfig.owner || !githubConfig.repo) return "";
    const branch = githubConfig.branch || "main";
    return `https://raw.githubusercontent.com/${githubConfig.owner}/${githubConfig.repo}/${branch}/${encodeGithubPath(cleanRelativePath(path))}`;
  }

  function safeImageSrc(value) {
    const source = decodeHtmlEntities(value).trim().replace(/^<|>$/g, "");
    if (!source || /^javascript:/i.test(source)) return "";
    if (isRelativePath(source)) {
      return isUploadedImagePath(source) ? rawGithubAssetUrl(source) || source : source;
    }

    try {
      const parsed = new URL(source, window.location.href);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.href;
    } catch (error) {
      return "";
    }

    return "";
  }

  function renderInlineText(value) {
    return escapeHtml(value)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
        const safeSrc = safeImageSrc(src);
        if (!safeSrc) return match;
        return `<img class="solution-image" src="${escapeHtml(safeSrc)}" alt="${escapeHtml(decodeHtmlEntities(alt))}" loading="lazy" />`;
      })
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function findClosingDollar(source, start) {
    for (let index = start; index < source.length; index += 1) {
      if (source[index] === "$" && source[index - 1] !== "\\" && source[index + 1] !== "$") {
        return index;
      }
    }
    return -1;
  }

  function findNextInlineMath(source, start) {
    let cursor = start;

    while (cursor < source.length) {
      const dollarStart = source.indexOf("$", cursor);
      const parenStart = source.indexOf("\\(", cursor);
      const starts = [dollarStart, parenStart].filter((index) => index >= 0);
      if (!starts.length) return null;

      const mathStart = Math.min(...starts);
      if (mathStart === parenStart) {
        const end = source.indexOf("\\)", mathStart + 2);
        if (end >= 0) {
          return { start: mathStart, end: end + 2 };
        }
        cursor = mathStart + 2;
        continue;
      }

      if (source[mathStart + 1] === "$") {
        cursor = mathStart + 2;
        continue;
      }

      const end = findClosingDollar(source, mathStart + 1);
      if (end >= 0) {
        return { start: mathStart, end: end + 1 };
      }
      cursor = mathStart + 1;
    }

    return null;
  }

  function renderInline(value) {
    const source = String(value || "");
    let output = "";
    let cursor = 0;
    let mathRange = findNextInlineMath(source, cursor);

    while (mathRange) {
      output += renderInlineText(source.slice(cursor, mathRange.start));
      output += escapeHtml(source.slice(mathRange.start, mathRange.end));
      cursor = mathRange.end;
      mathRange = findNextInlineMath(source, cursor);
    }

    output += renderInlineText(source.slice(cursor));
    return output;
  }

  function renderTitle(value) {
    return escapeHtml(value || "Untitled solution");
  }

  function showToast(message) {
    if (!toastRegion) return;

    window.clearTimeout(toastTimer);
    toastRegion.innerHTML = `<div class="toast-message" role="status">${escapeHtml(message)}</div>`;
    toastRegion.classList.add("is-visible");

    toastTimer = window.setTimeout(() => {
      toastRegion.classList.remove("is-visible");
    }, 2800);
  }

  function extractQuiverUrl(value) {
    const source = String(value);
    const iframeMatch = source.match(/<iframe\b[^>]*\bsrc=["']([^"']*q\.uiver\.app[^"']*)["'][^>]*>/i);
    const urlMatch = iframeMatch || source.match(/https:\/\/q\.uiver\.app\/[^\s"'<>\\\]]+/i);
    const rawUrl = urlMatch && urlMatch[1] ? urlMatch[1] : urlMatch && urlMatch[0];

    if (!rawUrl) return "";

    try {
      const url = new URL(rawUrl.replace(/&amp;/g, "&"));
      return url.hostname === "q.uiver.app" ? url.href : "";
    } catch (error) {
      return "";
    }
  }

  function getQuiverData(url) {
    try {
      const parsed = new URL(url);
      const hashParams = new URLSearchParams(parsed.hash.replace(/^#/, ""));
      return parsed.searchParams.get("q") || hashParams.get("q") || "";
    } catch (error) {
      return "";
    }
  }

  function makeQuiverEmbedUrl(url) {
    try {
      const parsed = new URL(url.replace(/&amp;/g, "&"));
      const q = getQuiverData(parsed.href);
      const embed = new URL("https://q.uiver.app/");
      embed.searchParams.set("embed", "");
      embed.searchParams.set("scale", "-1");

      if (q) {
        embed.hash = `q=${q}`;
      } else {
        embed.hash = parsed.hash.replace(/^#/, "");
      }

      return embed.href.replace("?embed=&", "?embed&");
    } catch (error) {
      return "";
    }
  }

  function decodeBase64Url(value) {
    const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return atob(padded);
  }

  function getQuiverSize(url) {
    const fallback = { width: 560, height: 360 };
    const q = getQuiverData(url);
    if (!q) return fallback;

    try {
      const data = JSON.parse(decodeBase64Url(q));
      const objectCount = Number(data[1]) || 0;
      const objects = data.slice(2, 2 + objectCount);
      const xs = objects.map((object) => Number(object[0])).filter(Number.isFinite);
      const ys = objects.map((object) => Number(object[1])).filter(Number.isFinite);
      if (!xs.length || !ys.length) return fallback;

      const width = Math.min(720, Math.max(380, (Math.max(...xs) - Math.min(...xs) + 1) * 120 + 120));
      const height = Math.min(560, Math.max(260, (Math.max(...ys) - Math.min(...ys) + 1) * 50 + 120));
      return { width, height };
    } catch (error) {
      return fallback;
    }
  }

  function parseQuiverDiagram(url) {
    const q = getQuiverData(url);
    if (!q) return null;

    try {
      const data = JSON.parse(decodeBase64Url(q));
      const objectCount = Number(data[1]) || 0;
      const objects = data.slice(2, 2 + objectCount).map((object, index) => ({
        index,
        x: Number(object[0]),
        y: Number(object[1]),
        label: String(object[2] || "")
      }));
      const arrows = data.slice(2 + objectCount).map((arrow) => ({
        from: Number(arrow[0]),
        to: Number(arrow[1]),
        label: String(arrow[2] || ""),
        labelSide: Number(arrow[3]) || 0,
        options: arrow[4] || {}
      }));

      if (!objects.length) return null;
      return { objects, arrows };
    } catch (error) {
      return null;
    }
  }

  function quiverStyleValue(arrow, path) {
    return path.reduce((value, key) => value && value[key], arrow.options || {});
  }

  function isQuiverDashed(arrow) {
    return quiverStyleValue(arrow, ["style", "body", "name"]) === "dashed";
  }

  function isQuiverHook(arrow) {
    return Boolean(quiverStyleValue(arrow, ["style", "tail", "name"]) === "hook");
  }

  function isQuiverCornerMarker(arrow) {
    return quiverStyleValue(arrow, ["style", "name"]) === "corner-inverse";
  }

  function renderQuiverSvgBlock(url) {
    const diagram = parseQuiverDiagram(url);
    if (!diagram) return "";

    const gridX = 190;
    const gridY = 70;
    const padding = 70;
    const xs = diagram.objects.map((object) => object.x);
    const ys = diagram.objects.map((object) => object.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    const width = Math.max(380, (maxX - minX) * gridX + padding * 2);
    const height = Math.max(260, (maxY - minY) * gridY + padding * 2);
    const markerId = `quiver-arrow-${Math.random().toString(36).slice(2)}`;
    const objectPoints = new Map(diagram.objects.map((object) => [
      object.index,
      {
        ...object,
        px: padding + (object.x - minX) * gridX,
        py: padding + (object.y - minY) * gridY
      }
    ]));
    const labels = [];
    const paths = diagram.arrows
      .map((arrow) => {
        const from = objectPoints.get(arrow.from);
        const to = objectPoints.get(arrow.to);
        if (!from || !to) return "";

        if (isQuiverCornerMarker(arrow)) {
          const x = from.px + (to.px - from.px) * 0.14;
          const y = from.py + (to.py - from.py) * 0.14;
          labels.push(`
            <div class="quiver-arrow-label quiver-corner-label" style="left:${x}px; top:${y}px;">
              <span>\\(\\ulcorner\\)</span>
            </div>
          `);
          return "";
        }

        const start = { x: from.px, y: from.py };
        const end = { x: to.px, y: to.py };
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.hypot(dx, dy) || 1;
        const normal = { x: -dy / length, y: dx / length };
        const line = shortenLine(start, end, Math.min(46, length * 0.32));
        const curve = Number(arrow.options.curve || 0);
        const curveOffset = curve * 66;
        const unit = { x: dx / length, y: dy / length };
        const middle = {
          x: (line.start.x + line.end.x) / 2,
          y: (line.start.y + line.end.y) / 2
        };
        const controlA = {
          x: line.start.x + unit.x * length * 0.28 + normal.x * curveOffset,
          y: line.start.y + unit.y * length * 0.28 + normal.y * curveOffset
        };
        const controlB = {
          x: line.end.x - unit.x * length * 0.28 + normal.x * curveOffset,
          y: line.end.y - unit.y * length * 0.28 + normal.y * curveOffset
        };
        const dash = isQuiverDashed(arrow) ? ' stroke-dasharray="8 10"' : "";
        const path = curve
          ? `<path d="M ${line.start.x} ${line.start.y} C ${controlA.x} ${controlA.y} ${controlB.x} ${controlB.y} ${line.end.x} ${line.end.y}"${dash} marker-end="url(#${markerId})"></path>`
          : `<line x1="${line.start.x}" y1="${line.start.y}" x2="${line.end.x}" y2="${line.end.y}"${dash} marker-end="url(#${markerId})"></line>`;

        if (arrow.label) {
          const side = arrow.labelSide === 2 ? -1 : 1;
          const labelOffset = curve ? curveOffset * 0.55 : -20 * side;
          labels.push(`
            <div class="quiver-arrow-label" style="left:${middle.x + normal.x * labelOffset}px; top:${middle.y + normal.y * labelOffset}px;">
              <span>\\(${escapeHtml(arrow.label)}\\)</span>
            </div>
          `);
        }

        if (isQuiverHook(arrow)) {
          const hookLength = 24;
          const hookBack = 18;
          const hookX1 = line.start.x + normal.x * hookLength * 0.55;
          const hookY1 = line.start.y + normal.y * hookLength * 0.55;
          const hookX2 = line.start.x - normal.x * hookLength * 0.55;
          const hookY2 = line.start.y - normal.y * hookLength * 0.55;
          const hookCx = line.start.x - unit.x * hookBack;
          const hookCy = line.start.y - unit.y * hookBack;
          return `${path}<path class="quiver-hook" d="M ${hookX1} ${hookY1} Q ${hookCx} ${hookCy} ${hookX2} ${hookY2}"></path>`;
        }

        return path;
      })
      .join("");
    const objectLabels = diagram.objects
      .map((object) => {
        const point = objectPoints.get(object.index);
        return `
          <div class="quiver-object-label" style="left:${point.px}px; top:${point.py}px;">
            <span>\\(${escapeHtml(point.label)}\\)</span>
          </div>
        `;
      })
      .join("");

    return `
      <figure class="quiver-static" style="--quiver-width:${width}px;">
        <div class="quiver-static-canvas" style="width:${width}px; height:${height}px;">
          <svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
            <defs>
              <marker id="${markerId}" markerWidth="13" markerHeight="13" refX="11" refY="6.5" orient="auto">
                <path class="quiver-marker-path" d="M1.25,1.25 L11,6.5 L1.25,11.75"></path>
              </marker>
            </defs>
            ${paths}
          </svg>
          <div class="quiver-static-labels">
            ${objectLabels}
            ${labels.join("")}
          </div>
        </div>
        <figcaption><a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">Open in quiver</a></figcaption>
      </figure>
    `;
  }

  function renderQuiverBlock(value) {
    const url = extractQuiverUrl(value);
    if (!url) return "";

    const embedUrl = makeQuiverEmbedUrl(url);
    const size = getQuiverSize(url);

    return `
      <figure class="quiver-embed" style="--quiver-width:${size.width}px; --quiver-height:${size.height}px;">
        <iframe src="${escapeHtml(embedUrl || url)}" loading="lazy" scrolling="no" title="quiver commutative diagram"></iframe>
        <figcaption><a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">Open in quiver</a></figcaption>
      </figure>
    `;
  }

  function stripMathWrapper(value) {
    return String(value)
      .replace(/^\s*\\\[\s*/, "")
      .replace(/\s*\\\]\s*$/, "")
      .trim();
  }

  function parseCellReference(value) {
    const match = String(value || "").match(/(\d+)-(\d+)/);
    if (!match) return null;
    return {
      row: Number(match[1]),
      col: Number(match[2])
    };
  }

  function splitArrowOptions(value) {
    const parts = [];
    let current = "";
    let braceDepth = 0;
    let inQuote = false;

    for (const character of String(value || "")) {
      if (character === '"' && !current.endsWith("\\")) {
        inQuote = !inQuote;
      }

      if (!inQuote) {
        if (character === "{") braceDepth += 1;
        if (character === "}") braceDepth = Math.max(0, braceDepth - 1);
      }

      if (character === "," && !inQuote && braceDepth === 0) {
        parts.push(current.trim());
        current = "";
      } else {
        current += character;
      }
    }

    if (current.trim()) parts.push(current.trim());
    return parts;
  }

  function stripOuterBraces(value) {
    let text = String(value || "").trim();
    while (text.startsWith("{") && text.endsWith("}")) {
      text = text.slice(1, -1).trim();
    }
    return text;
  }

  function parseCurveHeight(value) {
    const match = String(value || "").match(/curve\s*=\s*\{[^}]*height\s*=\s*([-0-9.]+)pt/i);
    return match ? Number(match[1]) : 0;
  }

  function parseArrow(command) {
    const optionMatch = String(command || "").match(/\\arrow\s*\[([\s\S]*)\]\s*$/);
    if (!optionMatch) return null;

    const options = splitArrowOptions(optionMatch[1]);
    const from = parseCellReference((optionMatch[1].match(/from\s*=\s*([0-9]+-[0-9]+)/) || [])[1]);
    const to = parseCellReference((optionMatch[1].match(/to\s*=\s*([0-9]+-[0-9]+)/) || [])[1]);
    const labelOption = options.find((option) => /^"/.test(option));
    const label = labelOption
      ? stripOuterBraces((labelOption.match(/^"([\s\S]*)"$/) || [])[1] || "")
      : "";
    const dashed = options.some((option) => /^dashed$/i.test(option));
    const curveHeight = parseCurveHeight(optionMatch[1]);

    if (!from || !to) return null;
    return { from, to, label, dashed, curveHeight };
  }

  function cleanTikzCell(value) {
    return decodeHtmlEntities(value)
      .replace(/\\\\\s*$/, "")
      .replace(/\\\s*$/, "")
      .trim();
  }

  function extractArrowCommands(value) {
    const commands = [];
    let matrix = "";
    let index = 0;
    const source = String(value || "");

    while (index < source.length) {
      const arrowIndex = source.indexOf("\\arrow", index);
      if (arrowIndex === -1) {
        matrix += source.slice(index);
        break;
      }

      matrix += source.slice(index, arrowIndex);
      let commandEnd = arrowIndex + "\\arrow".length;
      while (/\s/.test(source[commandEnd] || "")) commandEnd += 1;

      if (source[commandEnd] !== "[") {
        index = commandEnd;
        continue;
      }

      let bracketDepth = 0;
      let inQuote = false;
      while (commandEnd < source.length) {
        const character = source[commandEnd];
        if (character === '"' && source[commandEnd - 1] !== "\\") {
          inQuote = !inQuote;
        }
        if (!inQuote) {
          if (character === "[") bracketDepth += 1;
          if (character === "]") {
            bracketDepth -= 1;
            if (bracketDepth === 0) {
              commandEnd += 1;
              break;
            }
          }
        }
        commandEnd += 1;
      }

      commands.push(source.slice(arrowIndex, commandEnd));
      index = commandEnd;
    }

    return { matrix, commands };
  }

  function splitTikzRows(value) {
    const rows = [];
    let current = "";
    const source = String(value || "");
    let index = 0;

    while (index < source.length) {
      if (source[index] === "\\" && source[index + 1] === "\\") {
        rows.push(current);
        current = "";
        index += 2;
        while (/\s/.test(source[index] || "") && source[index] !== "\n") {
          index += 1;
        }
      } else {
        current += source[index];
        index += 1;
      }
    }

    rows.push(current);
    return rows;
  }

  function parseTikzcd(value) {
    const source = stripMathWrapper(decodeHtmlEntities(value));
    if (!/\\begin\{tikzcd\}/.test(source)) return null;

    const content = source
      .replace(/^[\s\S]*?\\begin\{tikzcd\}(?:\[[^\]]*\])?/, "")
      .replace(/\\end\{tikzcd\}[\s\S]*$/, "")
      .trim();
    const extracted = extractArrowCommands(content);
    const rows = [];
    const arrows = extracted.commands.map(parseArrow).filter(Boolean);

    splitTikzRows(extracted.matrix).forEach((rawRow) => {
      const cells = rawRow.split("&").map(cleanTikzCell);
      rows.push(cells);
    });

    if (!rows.length) return null;
    const usedCells = new Set();
    arrows.forEach((arrow) => {
      usedCells.add(`${arrow.from.row}-${arrow.from.col}`);
      usedCells.add(`${arrow.to.row}-${arrow.to.col}`);
    });
    const hasUsedCells = usedCells.size > 0;
    const displayRows = rows.map((row, rowIndex) => row.map((cell, colIndex) => ({
      originalRow: rowIndex + 1,
      originalCol: colIndex + 1,
      text: hasUsedCells && !usedCells.has(`${rowIndex + 1}-${colIndex + 1}`) ? "" : cell
    })));
    const nonEmptyRows = displayRows.filter((row) => row.some((cell) => cell.text));
    const columnCount = Math.max(...nonEmptyRows.map((row) => row.length), 1);
    const rowMap = new Map();
    const colMap = new Map();

    nonEmptyRows.forEach((row, displayRowIndex) => {
      rowMap.set(row[0].originalRow, displayRowIndex + 1);
      row.forEach((cell) => {
        if (cell.text) colMap.set(cell.originalCol, cell.originalCol);
      });
    });

    const usedColumns = [...new Set(nonEmptyRows.flatMap((row) => row
      .filter((cell) => cell.text)
      .map((cell) => cell.originalCol)))].sort((a, b) => a - b);
    usedColumns.forEach((column, displayColumnIndex) => {
      colMap.set(column, displayColumnIndex + 1);
    });

    const compressedRows = nonEmptyRows.map((row) => {
      const next = Array.from({ length: usedColumns.length || columnCount }, () => ({
        text: "",
        originalRow: row[0].originalRow,
        originalCol: 0
      }));
      row.forEach((cell) => {
        const col = colMap.get(cell.originalCol);
        if (col) next[col - 1] = cell;
      });
      return next;
    });

    const compressedArrows = arrows
      .map((arrow) => {
        const fromRow = rowMap.get(arrow.from.row);
        const toRow = rowMap.get(arrow.to.row);
        const fromCol = colMap.get(arrow.from.col);
        const toCol = colMap.get(arrow.to.col);
        if (!fromRow || !toRow || !fromCol || !toCol) return null;
        return {
          ...arrow,
          from: { row: fromRow, col: fromCol },
          to: { row: toRow, col: toCol }
        };
      })
      .filter(Boolean);

    const finalColumnCount = Math.max(...compressedRows.map((row) => row.length), 1);
    compressedRows.forEach((row) => {
      while (row.length < finalColumnCount) row.push({ text: "", originalRow: 0, originalCol: 0 });
    });

    return { rows: compressedRows, arrows: compressedArrows, columnCount: finalColumnCount };
  }

  function diagramPoint(ref, cellWidth, rowHeight, padding) {
    return {
      x: padding + (ref.col - 1) * cellWidth,
      y: padding + (ref.row - 1) * rowHeight
    };
  }

  function shortenLine(start, end, amount) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy) || 1;
    const ux = dx / length;
    const uy = dy / length;
    return {
      start: { x: start.x + ux * amount, y: start.y + uy * amount },
      end: { x: end.x - ux * amount, y: end.y - uy * amount },
      middle: { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 }
    };
  }

  function renderTikzcdBlock(value) {
    const diagram = parseTikzcd(value);
    if (!diagram) return "";

    const cellWidth = 170;
    const rowHeight = 112;
    const padding = 52;
    const width = padding * 2 + Math.max(0, diagram.columnCount - 1) * cellWidth;
    const height = padding * 2 + Math.max(0, diagram.rows.length - 1) * rowHeight;
    const markerId = `arrow-${Math.random().toString(36).slice(2)}`;
    const labels = [];
    const arrows = diagram.arrows
      .map((arrow) => {
        const start = diagramPoint(arrow.from, cellWidth, rowHeight, padding);
        const end = diagramPoint(arrow.to, cellWidth, rowHeight, padding);
        const line = shortenLine(start, end, 28);
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.hypot(dx, dy) || 1;
        const normal = { x: -dy / length, y: dx / length };
        const curveOffset = arrow.curveHeight ? arrow.curveHeight * 5 : 0;
        const control = {
          x: line.middle.x + normal.x * curveOffset,
          y: line.middle.y + normal.y * curveOffset
        };

        if (arrow.label) {
          const labelOffset = arrow.curveHeight ? curveOffset : -18;
          labels.push(`
            <div class="tikzcd-arrow-label" style="left:${line.middle.x + normal.x * labelOffset}px; top:${line.middle.y + normal.y * labelOffset}px;">
              <span>\\(${escapeHtml(arrow.label)}\\)</span>
            </div>
          `);
        }

        const dash = arrow.dashed ? ' stroke-dasharray="6 7"' : "";
        const path = arrow.curveHeight
          ? `<path d="M ${line.start.x} ${line.start.y} Q ${control.x} ${control.y} ${line.end.x} ${line.end.y}"${dash} marker-end="url(#${markerId})"></path>`
          : `<line x1="${line.start.x}" y1="${line.start.y}" x2="${line.end.x}" y2="${line.end.y}"${dash} marker-end="url(#${markerId})"></line>`;
        return `
          ${path}
        `;
      })
      .join("");
    const cells = diagram.rows
      .map((row, rowIndex) => row
        .map((cell, colIndex) => {
          const point = diagramPoint(
            { row: rowIndex + 1, col: colIndex + 1 },
            cellWidth,
            rowHeight,
            padding
          );
          return `
            <div class="tikzcd-cell" style="left:${point.x}px; top:${point.y}px;">
              ${cell.text ? `<span>\\(${escapeHtml(cell.text)}\\)</span>` : ""}
            </div>
          `;
        })
        .join(""))
      .join("");

    return `
      <figure class="tikzcd-render">
        <div class="tikzcd-canvas" style="width:${width}px; height:${height}px;">
          <svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
            <defs>
              <marker id="${markerId}" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path class="tikzcd-marker-path" d="M0.5,0.75 L6,3.5 L0.5,6.25"></path>
              </marker>
            </defs>
            ${arrows}
          </svg>
          <div class="tikzcd-labels">
            ${cells}
            ${labels.join("")}
          </div>
        </div>
      </figure>
    `;
  }

  function texDisplayEnvironment(line) {
    const match = line.trim().match(/^\\begin\{([a-zA-Z]+(?:\*)?)\}/);
    if (!match) return "";

    return texDisplayEnvironments.has(match[1]) ? match[1] : "";
  }

  function displayMathDelimiter(line) {
    const trimmed = line.trim();
    if (trimmed.startsWith("\\[")) {
      return {
        endPattern: /\\\]/,
        isClosed: (value) => /\\\]/.test(value)
      };
    }

    if (trimmed.startsWith("$$")) {
      return {
        endPattern: /\$\$/,
        isClosed: (value, isFirstLine) => {
          const source = String(value);
          return isFirstLine
            ? source.indexOf("$$", source.indexOf("$$") + 2) >= 0
            : /\$\$/.test(source);
        }
      };
    }

    return null;
  }

  function tokenizeBlocks(value) {
    const lines = String(value).replace(/\r\n?/g, "\n").split("\n");
    const blocks = [];
    let paragraph = [];
    let index = 0;

    function flushParagraph() {
      if (paragraph.length) {
        blocks.push({ type: "text", value: paragraph.join("\n") });
        paragraph = [];
      }
    }

    while (index < lines.length) {
      const line = lines[index];

      if (!line.trim()) {
        flushParagraph();
        index += 1;
        continue;
      }

      if (/^```/.test(line.trim())) {
        flushParagraph();
        const collected = [line];
        index += 1;
        while (index < lines.length && !/^```/.test(lines[index].trim())) {
          collected.push(lines[index]);
          index += 1;
        }
        if (index < lines.length) collected.push(lines[index]);
        blocks.push({ type: "code", value: collected.join("\n") });
        index += 1;
        continue;
      }

      if (/q\.uiver\.app/i.test(line)) {
        flushParagraph();
        const collected = [line];
        let sawTikz = /\\begin\{tikzcd\}/.test(line);
        index += 1;

        while (index < lines.length) {
          const nextLine = lines[index];
          if (!sawTikz && !nextLine.trim()) break;
          if (!sawTikz && !/^\s*(\\\[|\\begin\{tikzcd\})/.test(nextLine)) break;

          collected.push(nextLine);
          sawTikz = sawTikz || /\\begin\{tikzcd\}/.test(nextLine);
          index += 1;

          if (/\\end\{tikzcd\}/.test(nextLine)) break;
        }

        blocks.push({ type: "diagram", value: collected.join("\n") });
        continue;
      }

      if (/^\{%\s*quiver\s*%\}/i.test(line.trim()) || /<iframe\b/i.test(line) || /\\begin\{tikzcd\}/.test(line)) {
        flushParagraph();
        const collected = [line];
        let endPattern = /^\{%\s*endquiver\s*%\}/i.test(line.trim())
          ? null
          : /^\{%\s*quiver\s*%\}/i.test(line.trim())
            ? /^\{%\s*endquiver\s*%\}/i
            : /<iframe\b/i.test(line)
              ? /<\/iframe>/i
              : /\\end\{tikzcd\}/;
        if (endPattern && endPattern.test(line)) {
          endPattern = null;
        }
        index += 1;
        while (endPattern && index < lines.length && !endPattern.test(lines[index])) {
          collected.push(lines[index]);
          index += 1;
        }
        if (endPattern && index < lines.length) collected.push(lines[index]);
        blocks.push({ type: "diagram", value: collected.join("\n") });
        index += 1;
        continue;
      }

      const displayDelimiter = displayMathDelimiter(line);
      if (displayDelimiter) {
        flushParagraph();
        const collected = [line];
        index += 1;

        while (index < lines.length && !displayDelimiter.isClosed(collected[collected.length - 1], collected.length === 1)) {
          collected.push(lines[index]);
          index += 1;
        }

        blocks.push({ type: "math", value: collected.join("\n") });
        continue;
      }

      const displayEnvironment = texDisplayEnvironment(line);
      if (displayEnvironment) {
        flushParagraph();
        const collected = [line];
        const escapedEnvironment = displayEnvironment.replace(/\*/g, "\\*");
        const endPattern = new RegExp(`\\\\end\\{${escapedEnvironment}\\}`);
        index += 1;

        while (index < lines.length && !endPattern.test(lines[index])) {
          collected.push(lines[index]);
          index += 1;
        }
        if (index < lines.length) collected.push(lines[index]);

        blocks.push({ type: "math", value: collected.join("\n") });
        index += 1;
        continue;
      }

      paragraph.push(line);
      index += 1;
    }

    flushParagraph();
    return blocks;
  }

  function renderMarkdown(value) {
    if (!String(value).trim()) {
      return "";
    }

    return tokenizeBlocks(value)
      .map((block) => {
        const text = block.value.trim();
        if (block.type === "code") {
          return `<pre><code>${escapeHtml(text.replace(/^```\w*\n?/, "").replace(/\n?```$/, ""))}</code></pre>`;
        }

        if (block.type === "diagram") {
          const quiver = renderQuiverBlock(text);
          if (quiver) return quiver;
          const tikzcd = renderTikzcdBlock(text);
          if (tikzcd) return tikzcd;
          return `<pre class="tikzcd-code"><code>${escapeHtml(text)}</code></pre>`;
        }

        if (block.type === "math") {
          return `<div class="math-block">${escapeHtml(text)}</div>`;
        }

        if (extractQuiverUrl(text)) {
          return renderQuiverBlock(text);
        }

        if (/^\$\$[\s\S]*\$\$$/.test(text) || /^\\\[[\s\S]*\\\]$/.test(text)) {
          return `<div class="math-block">${escapeHtml(text)}</div>`;
        }

        if (/^###\s+/.test(text)) {
          return `<h4>${renderInline(text.replace(/^###\s+/, ""))}</h4>`;
        }

        if (/^##\s+/.test(text)) {
          return `<h3>${renderInline(text.replace(/^##\s+/, ""))}</h3>`;
        }

        if (/^#\s+/.test(text)) {
          return `<h2>${renderInline(text.replace(/^#\s+/, ""))}</h2>`;
        }

        if (/^[-*]\s+/m.test(text)) {
          const items = text
            .split(/\n/)
            .filter((line) => /^[-*]\s+/.test(line.trim()))
            .map((line) => `<li>${renderInline(line.trim().replace(/^[-*]\s+/, ""))}</li>`)
            .join("");
          return `<ul>${items}</ul>`;
        }

        if (/^\d+\.\s+/m.test(text)) {
          const items = text
            .split(/\n/)
            .filter((line) => /^\d+\.\s+/.test(line.trim()))
            .map((line) => `<li>${renderInline(line.trim().replace(/^\d+\.\s+/, ""))}</li>`)
            .join("");
          return `<ol>${items}</ol>`;
        }

        return `<p>${renderInline(text).replace(/\n/g, "<br>")}</p>`;
      })
      .join("");
  }

  function typesetMath() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([preview, list].filter(Boolean)).catch(() => {});
    }
  }

  function solutionText(solution) {
    return normalize([
      solution.chapter,
      solution.problem,
      solution.title,
      solution.author,
      solution.body
    ].join(" "));
  }

  function getVisibleSolutions() {
    const hiddenIds = getHiddenSolutionIds();
    return solutions.filter((solution) => remoteSolutionIds.has(solution.id) || !hiddenIds.includes(solution.id));
  }

  function getFilteredSolutions(visibleSolutions = getVisibleSolutions()) {
    const query = normalize(searchInput ? searchInput.value : "");
    if (!query) return visibleSolutions;
    return visibleSolutions.filter((solution) => solutionText(solution).includes(query));
  }

  function updateSolutionCount(total) {
    if (!solutionCount) return;
    solutionCount.textContent = `${total} solution${total === 1 ? "" : "s"}`;
  }

  function setSolutions(nextSolutions) {
    solutions.splice(0, solutions.length, ...nextSolutions);
    renderSolutions();
  }

  function renderSolutions() {
    if (!list) return;
    const visibleSolutions = getVisibleSolutions();
    const matches = getFilteredSolutions(visibleSolutions);
    updateSolutionCount(visibleSolutions.length);

    if (!visibleSolutions.length) {
      if (empty) empty.hidden = false;
      list.innerHTML = "";
      return;
    }

    if (empty) empty.hidden = true;
    list.innerHTML = matches
      .map((solution) => {
        const label = [solution.chapter, solution.problem].filter(Boolean).join(" · ");
        const author = solution.author ? `By ${solution.author}` : "";
        return `
          <article class="solution-entry" id="${escapeHtml(solution.id)}">
            <div class="solution-meta">
              <span>${escapeHtml(label || "Solution")}</span>
              ${author ? `<span>${escapeHtml(author)}</span>` : ""}
              <span>${escapeHtml(solution.updated || "")}</span>
            </div>
            <h2>${renderTitle(solution.title || "Untitled solution")}</h2>
            <div class="solution-body">${renderMarkdown(solution.body || "")}</div>
            <div class="solution-actions">
              <button type="button" class="secondary-button" data-edit-solution="${escapeHtml(solution.id)}">Edit solution</button>
              <button type="button" class="secondary-button" data-delete-solution="${escapeHtml(solution.id)}">Delete solution</button>
            </div>
          </article>
        `;
      })
      .join("");

    if (searchStatus) {
      const query = searchInput ? searchInput.value.trim() : "";
      searchStatus.textContent = query
        ? `${matches.length} matching solution${matches.length === 1 ? "" : "s"}`
        : `${matches.length} published solution${matches.length === 1 ? "" : "s"}`;
    }
    typesetMath();
  }

  function setStatus(message) {
    if (!status) return;
    status.textContent = message;
  }

  function setPublishStatus(message) {
    if (!publishStatus) return;
    publishStatus.textContent = message;
  }

  function setCollaboratorRequestStatus(message) {
    if (!collaboratorRequestStatus) return;
    collaboratorRequestStatus.textContent = message;
  }

  function setImageStatus(message) {
    if (!imageStatus) return;
    imageStatus.textContent = message;
  }

  async function loadLatestPublishedSolutions() {
    if (refreshingSolutions) return;
    refreshingSolutions = true;
    const sourcePath = githubConfig.solutionsPath || "rising-sea-solutions.js";

    try {
      const response = await fetch(`${sourcePath}?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) return;

      const remoteSolutions = parseSolutionsSource(await response.text());
      remoteSolutionIds.clear();
      remoteSolutions.forEach((solution) => remoteSolutionIds.add(solution.id));
      setSolutions(mergeSolutionLists(remoteSolutions, getLocalSolutions()));
    } catch (error) {
      // The static copy loaded above is enough when this refresh is unavailable.
    } finally {
      refreshingSolutions = false;
    }
  }

  function saveDraft() {
    const draft = {
      id: editingSolutionId,
      title: titleInput.value,
      chapter: chapterInput.value,
      problem: problemInput.value,
      author: authorInput.value,
      updated: dateInput.value,
      body: editor.value
    };
    localStorage.setItem(storageKey, JSON.stringify(draft));
    localStorage.setItem(authorStorageKey, authorInput.value);
  }

  function loadDraft() {
    const today = new Date().toISOString().slice(0, 10);
    let draft = {
      title: "",
      chapter: "",
      problem: "",
      author: localStorage.getItem(authorStorageKey) || "",
      updated: today,
      body: ""
    };

    try {
      draft = { ...draft, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
    } catch (error) {
      localStorage.removeItem(storageKey);
    }

    titleInput.value = draft.title;
    chapterInput.value = draft.chapter;
    problemInput.value = draft.problem;
    authorInput.value = draft.author || localStorage.getItem(authorStorageKey) || "";
    dateInput.value = draft.updated;
    editor.value = draft.body;
    editingSolutionId = draft.id || "";
    updatePublishButtonLabel();
  }

  function updatePreview() {
    if (!preview) return;
    const previewTitle = titleInput.value.trim()
      ? `<h2 class="preview-solution-title">${renderTitle(titleInput.value.trim())}</h2>`
      : "";
    preview.innerHTML = `${previewTitle}${renderMarkdown(editor.value)}`;
    saveDraft();
    typesetMath();
  }

  function makeSlug(value) {
    return String(value || "solution")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "solution";
  }

  function makeEntryObject() {
    const slugSource = `${chapterInput.value}-${problemInput.value}-${titleInput.value}`;
    return {
      id: editingSolutionId || makeSlug(slugSource),
      chapter: chapterInput.value.trim(),
      problem: problemInput.value.trim(),
      author: authorInput.value.trim(),
      title: titleInput.value.trim() || "Untitled solution",
      updated: dateInput.value,
      body: editor.value
    };
  }

  function solutionProblemLabel(solution) {
    return [solution.chapter, solution.problem].filter(Boolean).join(" · ") || solution.problem || "This problem";
  }

  function findDuplicateSolution(entry, entries = solutions) {
    const key = problemKey(entry);
    if (!key) return null;

    return entries.find((solution) => (
      solution.id !== entry.id && problemKey(solution) === key
    )) || null;
  }

  function showDuplicateWarning(duplicate) {
    const label = solutionProblemLabel(duplicate);
    const message = `${label} already has a published solution. Please edit the existing solution instead of posting a duplicate.`;
    setStatus(message);
    showToast("This problem already has a solution");

    if (searchInput) {
      searchInput.value = duplicate.problem || label;
      renderSolutions();
    }

    window.setTimeout(() => {
      const target = document.getElementById(duplicate.id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function escapeTemplate(value) {
    return String(value).replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  }

  function serializeSolutions(entries) {
    const body = entries
      .map((entry) => `  {
    id: ${JSON.stringify(entry.id)},
    chapter: ${JSON.stringify(entry.chapter)},
    problem: ${JSON.stringify(entry.problem)},
    author: ${JSON.stringify(entry.author || "")},
    title: ${JSON.stringify(entry.title)},
    updated: ${JSON.stringify(entry.updated)},
    body: String.raw\`${escapeTemplate(entry.body)}\`
  }`)
      .join(",\n");

    return `window.risingSeaSolutions = [\n${body}\n];\n`;
  }

  function texSectionCommand(level) {
    return level === 1 ? "section" : "subsection";
  }

  function texMetadataLine(label, value) {
    const text = String(value || "").trim();
    return text ? `% ${label}: ${text}` : `% ${label}:`;
  }

  function escapeTexTitle(value) {
    const source = String(value || "Untitled solution");
    const mathPattern = /\$[^$\n]*\$/g;
    let output = "";
    let cursor = 0;
    let match;

    function escapeTextSegment(segment) {
      return segment
        .replace(/\\/g, "\\textbackslash{}")
        .replace(/([%#$&_{}])/g, "\\$1")
        .replace(/\^/g, "\\textasciicircum{}")
        .replace(/~/g, "\\textasciitilde{}");
    }

    while ((match = mathPattern.exec(source))) {
      output += escapeTextSegment(source.slice(cursor, match.index));
      output += match[0];
      cursor = mathPattern.lastIndex;
    }

    output += escapeTextSegment(source.slice(cursor));
    return output;
  }

  function stripMarkdownEmphasisText(value) {
    return String(value || "").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
  }

  function findTexMathRange(source, start) {
    for (let index = start; index < source.length; index += 1) {
      if (source.startsWith("\\(", index)) {
        const end = source.indexOf("\\)", index + 2);
        if (end >= 0) return { start: index, end: end + 2 };
      }

      if (source.startsWith("\\[", index)) {
        const end = source.indexOf("\\]", index + 2);
        if (end >= 0) return { start: index, end: end + 2 };
      }

      if (source.startsWith("$$", index)) {
        const end = source.indexOf("$$", index + 2);
        if (end >= 0) return { start: index, end: end + 2 };
        index += 1;
        continue;
      }

      if (source[index] === "$" && source[index - 1] !== "\\" && source[index + 1] !== "$") {
        const end = findClosingDollar(source, index + 1);
        if (end >= 0) return { start: index, end: end + 1 };
      }

      if (source.startsWith("\\begin{", index)) {
        const match = source.slice(index).match(/^\\begin\{([a-zA-Z]+(?:\*)?)\}/);
        if (match && texDisplayEnvironments.has(match[1])) {
          const closing = `\\end{${match[1]}}`;
          const end = source.indexOf(closing, index + match[0].length);
          if (end >= 0) return { start: index, end: end + closing.length };
        }
      }
    }

    return null;
  }

  function stripMarkdownEmphasis(value) {
    const source = String(value || "");
    let output = "";
    let cursor = 0;
    let mathRange = findTexMathRange(source, cursor);

    while (mathRange) {
      output += stripMarkdownEmphasisText(source.slice(cursor, mathRange.start));
      output += source.slice(mathRange.start, mathRange.end);
      cursor = mathRange.end;
      mathRange = findTexMathRange(source, cursor);
    }

    output += stripMarkdownEmphasisText(source.slice(cursor));
    return output;
  }

  function trimTrailingWhitespace(value) {
    return String(value || "").replace(/[ \t]+$/gm, "");
  }

  function texImagePath(value) {
    const source = decodeHtmlEntities(value).trim().replace(/^<|>$/g, "");
    if (!source) return "";

    try {
      const parsed = new URL(source, window.location.href);
      const publishedUrl = new URL(githubConfig.publishedUrl || window.location.href);
      const branch = githubConfig.branch || "main";
      const rawPrefix = `/${githubConfig.owner}/${githubConfig.repo}/${branch}/`;

      if (parsed.hostname === "raw.githubusercontent.com" && parsed.pathname.startsWith(rawPrefix)) {
        return decodeURIComponent(parsed.pathname.slice(rawPrefix.length));
      }

      if (parsed.origin === publishedUrl.origin) {
        return parsed.pathname.replace(/^\/github-site\//, "").replace(/^\//, "");
      }
    } catch (error) {
      return source;
    }

    return source;
  }

  function markdownToTex(value) {
    return trimTrailingWhitespace(stripMarkdownEmphasis(value).replace(/!\[[^\]]*\]\(([^)]+)\)/g, (match, src) => {
      const imagePath = texImagePath(src);
      if (!imagePath || /^https?:\/\//i.test(imagePath)) {
        return `% External image omitted from TeX: ${src}`;
      }

      return [
        "\\begin{center}",
        `\\includegraphics[width=0.85\\linewidth]{${imagePath}}`,
        "\\end{center}"
      ].join("\n");
    }));
  }

  function serializeTexDocument(entries) {
    const sections = sortSolutionsByProblem(entries).map((entry) => {
      const heading = [entry.chapter, entry.problem, entry.title].filter(Boolean).join(" -- ");
      return [
        `\\${texSectionCommand(1)}{${escapeTexTitle(heading)}}`,
        `% id: ${entry.id}`,
        texMetadataLine("author", entry.author),
        texMetadataLine("updated", entry.updated),
        "",
        markdownToTex(entry.body).trim(),
        ""
      ].join("\n");
    });

    return String.raw`\documentclass[11pt]{article}

\usepackage[margin=1in]{geometry}
\usepackage{amsmath,amssymb,amsthm,mathrsfs,graphicx}
\usepackage{tikz-cd}
\usepackage{quiver}
\usepackage[colorlinks=true,linkcolor=blue,urlcolor=blue,citecolor=blue]{hyperref}

\providecommand{\A}{}
\renewcommand{\A}{\mathbb{A}}
\providecommand{\C}{}
\renewcommand{\C}{\mathbb{C}}
\providecommand{\F}{}
\renewcommand{\F}{\mathcal{F}}
\providecommand{\G}{}
\renewcommand{\G}{\mathcal{G}}
\providecommand{\bb}{}
\renewcommand{\bb}{\mathbb}
\providecommand{\td}{}
\renewcommand{\td}{\tilde}
\providecommand{\epsi}{}
\renewcommand{\epsi}{\varepsilon}
\providecommand{\mf}{}
\renewcommand{\mf}{\mathfrak}
\providecommand{\bs}{}
\renewcommand{\bs}{\backslash}
\providecommand{\supp}{}
\renewcommand{\supp}{\operatorname{Supp}}
\providecommand{\del}{}
\renewcommand{\del}{\partial}
\providecommand{\wg}{}
\renewcommand{\wg}{\wedge}
\providecommand{\proj}{}
\renewcommand{\proj}{\operatorname{proj}}
\providecommand{\mc}[1]{}
\renewcommand{\mc}[1]{\mathcal{#1}}
\providecommand{\ms}[1]{}
\renewcommand{\ms}[1]{\mathscr{#1}}
\providecommand{\O}{}
\renewcommand{\O}{\mathcal{O}}
\providecommand{\op}[1]{}
\renewcommand{\op}[1]{\operatorname{#1}}
\providecommand{\P}{}
\renewcommand{\P}{\mathbb{P}}
\providecommand{\Q}{}
\renewcommand{\Q}{\mathbb{Q}}
\providecommand{\R}{}
\renewcommand{\R}{\mathbb{R}}
\providecommand{\Z}{}
\renewcommand{\Z}{\mathbb{Z}}
\DeclareMathOperator{\Spec}{Spec}
\DeclareMathOperator{\Hom}{Hom}
\providecommand{\id}{}
\renewcommand{\id}{\operatorname{id}}
\providecommand{\im}{}
\renewcommand{\im}{\operatorname{im}}
\providecommand{\sgn}{}
\renewcommand{\sgn}{\operatorname{sgn}}
\providecommand{\rad}{}
\renewcommand{\rad}{\operatorname{rad}}
\providecommand{\md}{}
\renewcommand{\md}{\operatorname{mod}}
\providecommand{\sign}{}
\renewcommand{\sign}{\operatorname{sign}}
\providecommand{\Ann}{}
\renewcommand{\Ann}{\operatorname{Ann}}
\providecommand{\End}{}
\renewcommand{\End}{\operatorname{End}}
\providecommand{\Aut}{}
\renewcommand{\Aut}{\operatorname{Aut}}
\providecommand{\coker}{}
\renewcommand{\coker}{\operatorname{coker}}
\providecommand{\spa}{}
\renewcommand{\spa}{\operatorname{span}}
\providecommand{\gr}{}
\renewcommand{\gr}{\operatorname{Gr}}
\providecommand{\ot}{}
\renewcommand{\ot}{\otimes}
\providecommand{\range}{}
\renewcommand{\range}{\text{Range}}
\providecommand{\nb}{}
\renewcommand{\nb}{\nabla}
\providecommand{\bk}[1]{}
\renewcommand{\bk}[1]{\langle #1\rangle}
\providecommand{\bwg}{}
\renewcommand{\bwg}{\bigwedge\nolimits}
\providecommand{\Tor}{}
\renewcommand{\Tor}{\operatorname{Tor}}
\providecommand{\Bl}{}
\renewcommand{\Bl}{\operatorname{Bl}}

\title{Solutions to Vakil's The Rising Sea}
\author{Tianyi Wang}
\date{\today}

\begin{document}
\maketitle
\tableofcontents

${sections.length ? sections.join("\n") : "\\section*{No solutions yet}\n"}
\end{document}
`;
  }

  function upsertIntoList(entries, entry) {
    const entryChapter = normalize(entry.chapter);
    const entryProblem = normalize(entry.problem);
    const next = entries.slice();
    const index = next.findIndex((solution) => (
      solution.id === entry.id ||
      (normalize(solution.chapter) === entryChapter && normalize(solution.problem) === entryProblem)
    ));

    if (index >= 0) {
      next[index] = entry;
    } else {
      next.push(entry);
    }

    return next;
  }

  function upsertSolution(entry) {
    return upsertIntoList(solutions, entry);
  }

  function mergeSolutionLists(primary, secondary) {
    return secondary.reduce((merged, entry) => {
      const entryChapter = normalize(entry.chapter);
      const entryProblem = normalize(entry.problem);
      const index = merged.findIndex((solution) => (
        solution.id === entry.id ||
        (normalize(solution.chapter) === entryChapter && normalize(solution.problem) === entryProblem)
      ));

      if (index >= 0) {
        merged[index] = entry;
      } else {
        merged.push(entry);
      }

      return merged;
    }, primary.slice());
  }

  function getLocalSolutions() {
    try {
      const entries = JSON.parse(localStorage.getItem(localSolutionsStorageKey) || "[]");
      return Array.isArray(entries) ? entries : [];
    } catch (error) {
      localStorage.removeItem(localSolutionsStorageKey);
      return [];
    }
  }

  function saveLocalSolutions(entries) {
    localStorage.setItem(localSolutionsStorageKey, JSON.stringify(entries));
    localStorage.setItem(localTexStorageKey, serializeTexDocument(mergeSolutionLists(solutions, entries)));
  }

  function removeSolution(entries, id) {
    return entries.filter((solution) => solution.id !== id);
  }

  function getHiddenSolutionIds() {
    try {
      return JSON.parse(localStorage.getItem(hiddenStorageKey) || "[]");
    } catch (error) {
      localStorage.removeItem(hiddenStorageKey);
      return [];
    }
  }

  function saveHiddenSolutionIds(hiddenIds) {
    localStorage.setItem(hiddenStorageKey, JSON.stringify(hiddenIds));
  }

  function unhideSolutionLocally(id) {
    saveHiddenSolutionIds(getHiddenSolutionIds().filter((hiddenId) => hiddenId !== id));
  }

  function hideSolutionLocally(id) {
    const hiddenIds = getHiddenSolutionIds();
    if (!hiddenIds.includes(id)) hiddenIds.push(id);
    saveHiddenSolutionIds(hiddenIds);
    setSolutions(removeSolution(solutions, id));
    saveLocalSolutions(removeSolution(getLocalSolutions(), id));
  }

  function toBase64(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }

  function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    const chunkSize = 0x8000;

    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }

    return btoa(binary);
  }

  function fromBase64(value) {
    const binary = atob(String(value).replace(/\n/g, ""));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function parseSolutionsSource(source) {
    const sandbox = {};
    new Function("window", `"use strict";\n${source}`)(sandbox);
    if (!Array.isArray(sandbox.risingSeaSolutions)) {
      throw new Error("Remote solutions file did not define a solution list.");
    }
    return sandbox.risingSeaSolutions;
  }

  async function githubRequest(url, options) {
    const token = getGithubToken();
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(options && options.headers ? options.headers : {})
      }
    });

    if (!response.ok) {
      let detail = response.statusText;
      try {
        const data = await response.json();
        detail = data.message || detail;
      } catch (error) {
        detail = response.statusText;
      }
      throw new Error(`${response.status}: ${detail}`);
    }

    return response.json();
  }

  async function getGithubFile(contentsUrl, branch) {
    try {
      return await githubRequest(`${contentsUrl}?ref=${encodeURIComponent(branch)}`, {
        method: "GET"
      });
    } catch (error) {
      if (/^404:/.test(error.message)) return null;
      throw error;
    }
  }

  async function putGithubFile(contentsUrl, branch, file, message, content, options = {}) {
    return githubRequest(contentsUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content: options.base64 ? content : toBase64(content),
        sha: file ? file.sha : undefined,
        branch
      })
    });
  }

  function encodeGithubPath(path) {
    return String(path).split("/").map(encodeURIComponent).join("/");
  }

  function imageExtension(file) {
    const byName = (file.name.match(/\.[a-z0-9]+$/i) || [])[0];
    if (byName && /^(\.png|\.jpe?g|\.gif|\.webp)$/i.test(byName)) {
      return byName.toLowerCase();
    }

    const byType = {
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "image/gif": ".gif",
      "image/webp": ".webp"
    };
    return byType[file.type] || ".png";
  }

  function makeImagePath(file) {
    const baseName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 42) || "image";
    const folder = githubConfig.imagesPath || "rising-sea-images";
    const date = new Date().toISOString().slice(0, 10);
    return `${folder}/${date}/${Date.now()}-${baseName}${imageExtension(file)}`;
  }

  function insertTextAtCursor(input, text) {
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || start;
    input.value = `${input.value.slice(0, start)}${text}${input.value.slice(end)}`;
    input.selectionStart = start + text.length;
    input.selectionEnd = start + text.length;
    input.focus();
    updatePreview();
  }

  async function uploadImage(file) {
    if (!file) return;
    if (!getGithubToken()) {
      setImageStatus("Save a GitHub token before uploading images.");
      return;
    }

    if (!["image/png", "image/jpeg", "image/gif", "image/webp"].includes(file.type)) {
      setImageStatus("Choose a PNG, JPG, GIF, or WebP image.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setImageStatus("Choose an image smaller than 8 MB.");
      return;
    }

    insertImageButton.disabled = true;
    setImageStatus("Uploading image...");

    try {
      const owner = githubConfig.owner;
      const repo = githubConfig.repo;
      const branch = githubConfig.branch || "main";
      const path = makeImagePath(file);
      const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeGithubPath(path)}`;
      const content = arrayBufferToBase64(await file.arrayBuffer());
      await putGithubFile(
        contentsUrl,
        branch,
        null,
        `Upload Rising Sea image ${file.name}`,
        content,
        { base64: true }
      );

      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[\[\]\r\n]/g, " ").trim() || "image";
      const imageUrl = rawGithubAssetUrl(path) || path;
      insertTextAtCursor(editor, `\n\n![${alt}](${imageUrl})\n\n`);
      setImageStatus("Image uploaded and inserted. Publish or update the solution to share it.");
    } catch (error) {
      setImageStatus(`Image upload failed: ${error.message}`);
    } finally {
      insertImageButton.disabled = false;
      imageUploadInput.value = "";
    }
  }

  async function syncSolutionsToGithub(nextSolutions, message) {
    const owner = githubConfig.owner;
    const repo = githubConfig.repo;
    const branch = githubConfig.branch || "main";
    const solutionsPath = githubConfig.solutionsPath || "rising-sea-solutions.js";
    const texPath = githubConfig.texPath || "rising-sea-solutions.tex";
    const solutionsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${solutionsPath}`;
    const texUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${texPath}`;
    const solutionsFile = await getGithubFile(solutionsUrl, branch);
    const texFile = await getGithubFile(texUrl, branch);
    const solutionsResult = await putGithubFile(
      solutionsUrl,
      branch,
      solutionsFile,
      message,
      serializeSolutions(nextSolutions)
    );
    await putGithubFile(
      texUrl,
      branch,
      texFile,
      `${message} TeX`,
      serializeTexDocument(nextSolutions)
    );
    return solutionsResult;
  }

  async function publishEntry() {
    const isEditing = Boolean(editingSolutionId);
    const entry = makeEntryObject();
    if (!entry.chapter || !entry.problem) {
      setStatus("Chapter and problem are required before publishing.");
      return;
    }

    setStatus("Checking for an existing solution to this problem...");
    await loadLatestPublishedSolutions();

    const duplicate = findDuplicateSolution(entry);
    if (duplicate) {
      showDuplicateWarning(duplicate);
      return;
    }

    unhideSolutionLocally(entry.id);
    const visibleNextSolutions = upsertSolution(entry);
    const localPendingSolutions = upsertIntoList(getLocalSolutions(), entry);
    setSolutions(visibleNextSolutions);
    saveLocalSolutions(localPendingSolutions);
    setStatus("Published in the list below.");
    showToast(isEditing ? "Solution edited" : "Solution posted");

    const token = getGithubToken();
    if (!token) {
      setPublishStatus("Published in this browser. Save a GitHub token to sync it to the website.");
      return;
    }

    publishButton.disabled = true;
    setPublishStatus("Syncing solution to GitHub...");

    try {
      const owner = githubConfig.owner;
      const repo = githubConfig.repo;
      const branch = githubConfig.branch || "main";
      const path = githubConfig.solutionsPath || "rising-sea-solutions.js";
      const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const currentFile = await getGithubFile(contentsUrl, branch);
      const remoteSolutions = currentFile
        ? parseSolutionsSource(fromBase64(currentFile.content))
        : solutions.slice();
      const remoteDuplicate = findDuplicateSolution(entry, remoteSolutions);
      if (remoteDuplicate) {
        const cleanedLocalPending = removeSolution(localPendingSolutions, entry.id);
        setSolutions(mergeSolutionLists(remoteSolutions, cleanedLocalPending));
        saveLocalSolutions(cleanedLocalPending);
        showDuplicateWarning(remoteDuplicate);
        setPublishStatus("Sync stopped because this problem already exists on the public site.");
        return;
      }

      const mergedSolutions = mergeSolutionLists(remoteSolutions, localPendingSolutions);
      const nextSolutions = upsertIntoList(mergedSolutions, entry);
      const result = await syncSolutionsToGithub(nextSolutions, `Publish Rising Sea solution ${entry.problem}`);

      setSolutions(nextSolutions);
      saveLocalSolutions([]);
      setPublishStatus(`Synced to the public site. Open pages refresh automatically after GitHub Pages updates. Commit: ${result.commit.sha.slice(0, 7)}.`);
    } catch (error) {
      setPublishStatus(`It is visible here, but GitHub sync failed: ${error.message}`);
    } finally {
      publishButton.disabled = false;
    }
  }

  async function deletePublishedSolution(id) {
    const solution = solutions.find((entry) => entry.id === id);
    if (!solution) return;

    hideSolutionLocally(id);
    setPublishStatus("Deleted from the list below.");

    const token = getGithubToken();
    if (!token) {
      setPublishStatus("Deleted from this browser. Save a GitHub token to delete permanently from the published site.");
      return;
    }

    setPublishStatus("Syncing deletion to GitHub...");

    try {
      const owner = githubConfig.owner;
      const repo = githubConfig.repo;
      const branch = githubConfig.branch || "main";
      const path = githubConfig.solutionsPath || "rising-sea-solutions.js";
      const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const currentFile = await getGithubFile(contentsUrl, branch);
      const remoteSolutions = currentFile
        ? parseSolutionsSource(fromBase64(currentFile.content))
        : solutions.slice();
      const nextSolutions = removeSolution(remoteSolutions, id);

      if (nextSolutions.length === remoteSolutions.length) {
        throw new Error("Solution was not found in the remote file.");
      }

      const result = await syncSolutionsToGithub(nextSolutions, `Delete Rising Sea solution ${solution.problem || solution.id}`);

      setSolutions(nextSolutions);
      saveLocalSolutions(removeSolution(getLocalSolutions(), id));
      setPublishStatus(`Deleted from the public site. Open pages refresh automatically after GitHub Pages updates. Commit: ${result.commit.sha.slice(0, 7)}.`);
    } catch (error) {
      setPublishStatus(`It is hidden here, but GitHub deletion failed: ${error.message}`);
    }
  }

  function resetDraft() {
    localStorage.removeItem(storageKey);
    editingSolutionId = "";
    loadDraft();
    updatePreview();
    setStatus("Draft reset.");
  }

  function updatePublishButtonLabel() {
    if (!publishButton) return;
    publishButton.textContent = editingSolutionId ? "Update solution" : "Publish solution";
  }

  function startNewSolution() {
    const today = new Date().toISOString().slice(0, 10);
    editingSolutionId = "";
    titleInput.value = "";
    chapterInput.value = "";
    problemInput.value = "";
    authorInput.value = localStorage.getItem(authorStorageKey) || authorInput.value || "";
    dateInput.value = today;
    editor.value = "";
    updatePublishButtonLabel();
    updatePreview();
    setStatus("Ready for a new solution.");
    document.querySelector(".solution-editor").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function editPublishedSolution(id) {
    const solution = solutions.find((entry) => entry.id === id);
    if (!solution) return;

    editingSolutionId = solution.id;
    titleInput.value = solution.title || "";
    chapterInput.value = solution.chapter || "";
    problemInput.value = solution.problem || "";
    authorInput.value = solution.author || localStorage.getItem(authorStorageKey) || "";
    dateInput.value = solution.updated || new Date().toISOString().slice(0, 10);
    editor.value = solution.body || "";
    updatePublishButtonLabel();
    updatePreview();
    setStatus("Editing the selected solution.");
    document.querySelector(".solution-editor").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function saveGithubToken() {
    const token = tokenInput.value.trim();
    if (!token) {
      setPublishStatus("Paste a GitHub token before saving.");
      return;
    }
    localStorage.setItem(tokenStorageKey, token);
    tokenInput.value = "";
    setPublishStatus("Token saved in this browser. The next publish or update will sync local solutions and the TeX file to GitHub.");
  }

  function clearGithubToken() {
    localStorage.removeItem(tokenStorageKey);
    setPublishStatus("Token cleared.");
  }

  function downloadTexDocument() {
    const content = serializeTexDocument(solutions);
    localStorage.setItem(localTexStorageKey, content);
    const blob = new Blob([content], { type: "application/x-tex" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "rising-sea-solutions.tex";
    link.click();
    URL.revokeObjectURL(link.href);
    setPublishStatus("Downloaded the current TeX file.");
  }

  async function sendCollaboratorRequest(event) {
    event.preventDefault();
    if (!collaboratorRequestForm) return;

    const nameInput = collaboratorRequestForm.querySelector("[data-collaborator-name]");
    const githubInput = collaboratorRequestForm.querySelector("[data-collaborator-github]");
    const name = String(nameInput && nameInput.value || "").trim();
    const githubAccount = normalizeGithubAccount(githubInput && githubInput.value);

    if (!name || !githubAccount) {
      setCollaboratorRequestStatus("Name and GitHub account are required.");
      return;
    }

    if (!isGithubAccount(githubAccount)) {
      setCollaboratorRequestStatus("Enter a valid GitHub username, for example Anson-Law.");
      return;
    }

    if (collaboratorRequestSubmit) collaboratorRequestSubmit.disabled = true;
    setCollaboratorRequestStatus("Sending request...");

    try {
      const response = await fetch(collaboratorRequestForm.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _subject: "Rising Sea collaborator request",
          _template: "table",
          _captcha: "false",
          name,
          github_account: githubAccount,
          github_profile: `https://github.com/${githubAccount}`,
          requested_from: window.location.href
        })
      });
      let data = {};
      try {
        data = await response.json();
      } catch (error) {
        data = {};
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || response.statusText || "Request could not be sent.");
      }

      collaboratorRequestForm.reset();
      setCollaboratorRequestStatus("Request sent. Tianyi will receive an email with your GitHub account.");
      showToast("Request sent");
    } catch (error) {
      setCollaboratorRequestStatus(`Request failed: ${error.message}`);
    } finally {
      if (collaboratorRequestSubmit) collaboratorRequestSubmit.disabled = false;
    }
  }

  function bindSearch() {
    if (!searchInput) return;
    searchInput.addEventListener("input", renderSolutions);
    searchInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      const first = list && list.querySelector(".solution-entry");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function bindSolutionActions() {
    if (!list) return;
    list.addEventListener("click", (event) => {
      const editButton = event.target.closest("[data-edit-solution]");
      if (editButton) {
        editPublishedSolution(editButton.getAttribute("data-edit-solution"));
        return;
      }

      const button = event.target.closest("[data-delete-solution]");
      if (!button) return;
      deletePublishedSolution(button.getAttribute("data-delete-solution"));
    });
  }

  function bindCollaboratorRequest() {
    if (!collaboratorRequestForm) return;
    collaboratorRequestForm.addEventListener("submit", sendCollaboratorRequest);
  }

  function bindEditor() {
    if (!editor || !preview) return;

    loadDraft();
    [editor, titleInput, chapterInput, problemInput, authorInput, dateInput].forEach((input) => {
      input.addEventListener("input", updatePreview);
    });
    newSolutionButton.addEventListener("click", startNewSolution);
    publishButton.addEventListener("click", publishEntry);
    resetButton.addEventListener("click", resetDraft);
    saveTokenButton.addEventListener("click", saveGithubToken);
    downloadTexButton.addEventListener("click", downloadTexDocument);
    clearTokenButton.addEventListener("click", clearGithubToken);
    insertImageButton.addEventListener("click", () => imageUploadInput.click());
    imageUploadInput.addEventListener("change", () => uploadImage(imageUploadInput.files[0]));
    updatePreview();

    if (getGithubToken()) {
      setPublishStatus("GitHub token is saved in this browser.");
    }
  }

  setSolutions(mergeSolutionLists(solutions, getLocalSolutions()));
  bindSearch();
  bindSolutionActions();
  bindCollaboratorRequest();
  bindEditor();
  loadLatestPublishedSolutions();
  setInterval(loadLatestPublishedSolutions, githubConfig.refreshMs || 30000);
  typesetMath();
})();
