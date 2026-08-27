window.risingSeaSolutions = [
  {
    id: "1-1-1-c-double-dual-functor",
    chapter: "1",
    problem: "1.1.C",
    title: "Double Dual Functor",
    updated: "2026-08-27",
    body: String.raw`This amounts to checking commutativity of the following diagram:
% https://q.uiver.app/#q=WzAsNCxbMCwwLCJWXntcXHZlZVxcdmVlfSJdLFsxLDAsIldee1xcdmVlXFx2ZWV9Il0sWzAsMSwiViJdLFsxLDEsIlciXSxbMCwxLCJmXntcXHZlZVxcdmVlfSJdLFsyLDMsImYiLDJdLFsyLDAsIm1fViJdLFszLDEsIm1fVyIsMl1d
\[\begin{tikzcd}[cramped]
	{V^{\vee\vee}} & {W^{\vee\vee}} \\
	V & W
	\arrow["{f^{\vee\vee}}", from=1-1, to=1-2]
	\arrow["{m_V}", from=2-1, to=1-1]
	\arrow["f"', from=2-1, to=2-2]
	\arrow["{m_W}"', from=2-2, to=1-2]
\end{tikzcd}\]
Here, the map $m_V: V^{\vee\vee}\to V$ is defined to be
$$
m_V:v\mapsto \epsilon_v
$$
where $\epsilon_v: V^\vee\to k$ is defined to be the delta mass at the funcional $\delta_v\in V^\vee$, where $\delta_v: V\to k$ is the delta mass at the vector $v\in V$.`
  }
];
