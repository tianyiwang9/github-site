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
  },
  {
    id: "1-1-1-b-automorphism-group",
    chapter: "1",
    problem: "1.1.B",
    title: "Automorphism Group",
    updated: "2026-08-27",
    body: String.raw`Let $A$ be an object in a category $\ms C$. The invertible elements $\op{Aut}(A)\subset \op{Mor}(A,A)$ indeed forms a group because we have the identity $\op{id}_A: A\to A$, and every morphism is invertible by definition. Moreover associativity holds by definition of a category. Hence $\op{Aut}(A)$ is indeed a group.

In the example of sets, $\op{Aut}(A)$ is the set of bijections from $A$ to itself; In the example of vector spaces, $\op{Aut}(V)$ is the set of linear isomorphisms from $V$ to itself.`
  }
];
