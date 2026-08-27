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
Here, the map $m_V: V\to V^{\vee\vee}$ is defined to be
$$
m_V:v\mapsto (\epsilon\mapsto \epsilon(v)).
$$
`
  },
  {
    id: "1-1-1-b-automorphism-group",
    chapter: "1",
    problem: "1.1.B",
    title: "Automorphism Group",
    updated: "2026-08-27",
    body: String.raw`Let $A$ be an object in a category $\ms C$. The invertible elements $\op{Aut}(A)\subset \op{Mor}(A,A)$ indeed forms a group because we have the identity $\op{id}_A: A\to A$, and every morphism is invertible by definition. Moreover associativity holds by definition of a category. Hence $\op{Aut}(A)$ is indeed a group.

In the example of sets, $\op{Aut}(A)$ is the set of bijections from $A$ to itself; In the example of vector spaces, $\op{Aut}(V)$ is the set of linear isomorphisms from $V$ to itself.`
  },
  {
    id: "1-1-1-d-dimensions-characterizes-vector-spaces",
    chapter: "1",
    problem: "1.1.D",
    title: "Dimensions Characterizes Vector Spaces",
    updated: "2026-08-27",
    body: String.raw`We show that $\ms V\to \op{f.d.Vec}_k$ is an equivalence of categories. We construct the inverse functor as follows: Simultaneously choose basis for each vector space $V\in \op{f.d.Vec}_k$ (which Vakil says we can do). Define the functor $D: \op{f.d.Vec}_k\to \ms V$ as follows: For each $V$ define
$$
D(V)=k^{\dim V}
$$
where $\dim V$ is defined as the length of the basis of $V$ we choose. For every linear map $f:V\to W$, by choosing a basis this becomes a matrix of dimension $(\dim W)\times (\dim V)$, which can be now identified with a map
$$
D(f): k^{\dim V}\to k^{\dim W}.
$$
[I have no idea if this works...]`
  }
];
