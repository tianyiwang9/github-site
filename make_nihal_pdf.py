from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)


OUT = "output/pdf/nihal_sarin_naroditsky_chinese_full_translation.pdf"
IMG = "tmp/pdfs/nihal_enhanced.png"
SOURCE_URL = "https://www.hindustantimes.com/sports/others/many-times-i-ve-opened-his-profile-hoping-to-see-him-online-nihal-remembers-naroditsky-101783092352410.html"

FONT_PATH = "/System/Library/Fonts/Supplemental/Songti.ttc"
pdfmetrics.registerFont(TTFont("Songti", FONT_PATH, subfontIndex=3))


def zh_wrap(text, style, width):
    lines, line = [], ""
    for ch in text:
        trial = line + ch
        if stringWidth(trial, style.fontName, style.fontSize) <= width:
            line = trial
        else:
            lines.append(line)
            line = ch
    if line:
        lines.append(line)
    return "<br/>".join(lines)


styles = getSampleStyleSheet()
base = "Songti"
styles.add(ParagraphStyle(
    name="Kicker", fontName=base, fontSize=9, leading=12, textColor=colors.HexColor("#8A5A22"),
    alignment=TA_CENTER, spaceAfter=6, uppercase=True
))
styles.add(ParagraphStyle(
    name="TitleCN", fontName=base, fontSize=25, leading=31, textColor=colors.HexColor("#171717"),
    alignment=TA_CENTER, spaceAfter=8
))
styles.add(ParagraphStyle(
    name="Deck", fontName=base, fontSize=12.5, leading=18, textColor=colors.HexColor("#4A4A4A"),
    alignment=TA_CENTER, spaceAfter=12
))
styles.add(ParagraphStyle(
    name="Meta", fontName=base, fontSize=8.5, leading=12, textColor=colors.HexColor("#777777"),
    alignment=TA_CENTER, spaceAfter=12
))
styles.add(ParagraphStyle(
    name="BodyCN", fontName=base, fontSize=10.2, leading=16.2, textColor=colors.HexColor("#202020"),
    alignment=TA_LEFT, firstLineIndent=18, spaceAfter=7, splitLongWords=0, wordWrap="CJK"
))
styles.add(ParagraphStyle(
    name="Lead", fontName=base, fontSize=12.8, leading=19, textColor=colors.HexColor("#1F1F1F"),
    alignment=TA_LEFT, firstLineIndent=0, spaceAfter=10
))
styles.add(ParagraphStyle(
    name="PullQuote", fontName=base, fontSize=12.2, leading=18, textColor=colors.HexColor("#7B3F00"),
    alignment=TA_CENTER, leftIndent=8, rightIndent=8, spaceBefore=8, spaceAfter=10
))
styles.add(ParagraphStyle(
    name="Section", fontName=base, fontSize=13.2, leading=17, textColor=colors.HexColor("#111111"),
    alignment=TA_LEFT, spaceBefore=8, spaceAfter=5
))
styles.add(ParagraphStyle(
    name="Caption", fontName=base, fontSize=8.4, leading=11, textColor=colors.HexColor("#666666"),
    alignment=TA_CENTER, spaceAfter=8
))
styles.add(ParagraphStyle(
    name="Note", fontName=base, fontSize=8, leading=11.5, textColor=colors.HexColor("#666666"),
    alignment=TA_LEFT, splitLongWords=0
))


def protect(text):
    protected = [
        "2000 盘",
        "21 岁",
        "29 岁",
        "30 秒棋",
        "12 个月",
        "7 月 3 日至 5 日",
        "50000 美元",
        "bullet 和 hyperbullet",
        "Bullet Chess Championship",
        "European Club Cup",
        "North Carolina 州",
        "Naroditsky Memorial Rapid and Blitz",
        "Fide Circuit",
        "US Grand Prix",
        "World Championship",
        "Robert Hess",
    ]
    for phrase in protected:
        text = text.replace(phrase, phrase.replace(" ", "&nbsp;"))
    return text


ReportLabParagraph = Paragraph


def Paragraph(text, style, *args, **kwargs):
    return ReportLabParagraph(protect(text), style, *args, **kwargs)


class MagazineDoc(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=20 * mm,
            rightMargin=20 * mm,
            topMargin=18 * mm,
            bottomMargin=18 * mm,
        )
        page_w, page_h = A4
        col_gap = 7 * mm
        col_w = (page_w - self.leftMargin - self.rightMargin - col_gap) / 2
        y = self.bottomMargin + 18 * mm
        h = page_h - self.topMargin - self.bottomMargin - 26 * mm
        cover = Frame(self.leftMargin, self.bottomMargin + 8 * mm, page_w - self.leftMargin - self.rightMargin, page_h - self.topMargin - self.bottomMargin - 8 * mm, id="cover")
        col1 = Frame(self.leftMargin, y, col_w, h, id="col1")
        col2 = Frame(self.leftMargin + col_w + col_gap, y, col_w, h, id="col2")
        self.addPageTemplates([
            PageTemplate(id="Cover", frames=[cover], onPage=self.draw_page),
            PageTemplate(id="Columns", frames=[col1, col2], onPage=self.draw_page),
        ])

    def draw_page(self, canvas, doc):
        canvas.saveState()
        w, h = A4
        canvas.setFillColor(colors.HexColor("#FBF7EF"))
        canvas.rect(0, 0, w, h, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#151515"))
        canvas.rect(0, h - 10 * mm, w, 10 * mm, stroke=0, fill=1)
        canvas.setFillColor(colors.white)
        canvas.setFont(base, 8)
        canvas.drawString(20 * mm, h - 6.5 * mm, "CHESS NOTEBOOK")
        canvas.setFillColor(colors.HexColor("#8A5A22"))
        canvas.rect(20 * mm, 15 * mm, w - 40 * mm, 0.45 * mm, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#666666"))
        canvas.setFont(base, 8)
        canvas.drawCentredString(w / 2, 10 * mm, str(doc.page))
        canvas.restoreState()


story = []
story.append(Paragraph("人物 · 纪念 · 子弹棋", styles["Kicker"]))
story.append(Paragraph(zh_wrap("很多次，我打开他的主页，希望看见他在线：Nihal 追忆 Naroditsky", styles["TitleCN"], 150 * mm), styles["TitleCN"]))
story.append(Paragraph("印度特级大师 Nihal Sarin 夺得子弹棋冠军后，将胜利献给已故美国特级大师 Daniel Naroditsky。", styles["Deck"]))
story.append(Paragraph("Hindustan Times 中文译文 | 原文作者：Susan Ninan | 更新：2026 年 7 月 3 日 20:55 IST", styles["Meta"]))
story.append(Image(IMG, width=135 * mm, height=76 * mm))
story.append(Paragraph("Nihal Sarin。图片基于 Hindustan Times / HT 新闻图作清晰化增强。", styles["Caption"]))
story.append(NextPageTemplate("Columns"))

story.append(Paragraph("距离 Nihal 上一次与美国特级大师 Daniel Naroditsky 对弈，已经大约过去了八个月。去年 10 月，29 岁的 Naroditsky 被发现死于他位于 Charlotte 的家中。Naroditsky 生前最后一次在线下棋，对手正是这位 21 岁的印度特级大师。", styles["BodyCN"]))

story.append(Paragraph("两人从未在线下见过面，但多年来，他们在网上彼此交手超过 2000 盘，建立起一段几乎完全由闪电棋和子弹棋构成的、不同寻常的友谊。", styles["BodyCN"]))

story.append(Paragraph("上周末，Nihal 成为首位赢得 Bullet Chess Championship 的印度棋手。夺冠后，他的思绪立刻飘向 Naroditsky。Nihal 将这个冠军献给已故好友，并写道：“我们下过无数盘 bullet 和 hyperbullet，这无疑促成了我作为棋手的成长。”", styles["BodyCN"]))

story.append(Paragraph("Naroditsky 去世前的那些日子，至今仍令人难以回望。Nihal 说，当时 Naroditsky 正因前世界冠军 Vladimir Kramnik 提出的作弊指控而受到审视，两人曾互发消息。周五，Fide 道德与纪律委员会宣布，由于 Kramnik 在网上发布有关 Naroditsky 和 GM David Navara 的帖子，对其处以两年禁令，禁止参加 Fide 赛事或担任官方棋类职务。实际停赛期为一年，另有 12 个月为棋界提供无偿服务，作为补充处罚。", styles["BodyCN"]))

story.append(Paragraph("“那些（指控）完全是一派胡言。说真的。Danya 是最不可能想到作弊的人。而且也完全没有动机……我前一天还给他发了消息，大概是告诉他一切都会好起来。他显然承受着压力。我不知道情况已经那么糟。”", styles["BodyCN"]))

story.append(Paragraph("Nihal 得知 Naroditsky 去世的消息时，正在希腊 Rhodes 参加 European Club Cup。“我震惊而崩溃。那太可怕了。”之后好几个星期，就连国际象棋本身也让 Nihal 难以面对。", styles["BodyCN"]))

story.append(Paragraph("“我想我有好几个星期甚至没有打开 Chess.com。通常情况下，我会经常登录。”", styles["BodyCN"]))

story.append(Paragraph("“Danya 是那个我知道永远愿意来一场高质量对局的人。要找到一个强棋手，能长时间和你对弈，是很难的。他就像那个几乎一定会接受挑战、并下出一场非常好比赛的人。我们下过很多 30 秒棋。他在这种棋里绝对是怪物。状态好的时候，他属于世界最顶尖的一群。通常我一登录，就会看到 Danya 发来的挑战。自从他去世以后，很多次，我打开他的主页，希望看见他在线。”", styles["BodyCN"]))

story.append(Paragraph("Nihal 原本应该参加 7 月 3 日至 5 日在 North Carolina 州 Charlotte 举行的首届 Naroditsky Memorial Rapid and Blitz 锦标赛，但签证问题意味着他不得不退赛。这是一场为期三天的国际象棋节，汇集顶尖棋手、国际象棋内容创作者以及更广泛的棋界社群。赛事总奖金为 50000 美元，并授予 Fide Circuit 积分和 US Grand Prix 积分。除世界前三中的两位 Hikaru Nakamura 和 Fabiano Caruana 外，10 人参赛阵容还包括 World Championship 挑战者 Javokhir Sindarov、老将 Vasyl Ivanchuk；Aravindh Chithambaram 是阵容中唯一的印度棋手。", styles["BodyCN"]))

story.append(Paragraph("“我当然非常想去。但我没有美国签证。没有足够时间为这项赛事办好签证，所以我只能做出艰难决定，选择不去。”", styles["BodyCN"]))

story.append(Paragraph("作为特级大师、作者、主播，Danya 也是最高产、最受喜爱的解说之一。“他和 Robert Hess 是一个非常棒的组合。毫无疑问，是我最喜欢的。Danya 就是下过国际象棋的人里最聪明的存在之一。他是个天才。”", styles["BodyCN"]))

story.append(Paragraph("Nihal 用“非常、非常大”来形容这位美国特级大师对自己的影响。他说：“我真的一直渴望能在线下见到他，但遗憾的是，那从未发生。我们确实是相当好的朋友。他是一个非常温柔的灵魂。他对我非常、非常好。在我古典棋状态艰难、真的很难突破的时候，他一直很善良，也很支持我。他一直相信我。”", styles["BodyCN"]))

story.append(Paragraph("谈到自己最近的 Bullet Chess Championship 冠军，Nihal 说：“如果 Danya 还在，他会为我非常、非常骄傲。”然后，他几乎是本能地笑着补了一句：“但如果他也在那儿，他可能会赢下这项赛事。”", styles["BodyCN"]))

story.append(Spacer(1, 8))
story.append(Paragraph("来源：Hindustan Times，原文链接为用户提供的文章地址。", styles["Note"]))
story.append(Paragraph("说明：本文为用户提供原文的中文完整译文；图片使用 AI 图像编辑进行清晰化增强。", styles["Note"]))

doc = MagazineDoc(OUT)
doc.build(story)
print(OUT)
