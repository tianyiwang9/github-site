window.risingSeaSolutions = [
  {
    id: "1-1-1-c-double-dual-functor",
    chapter: "1",
    problem: "1.1.C",
    author: "",
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
    author: "",
    title: "Automorphism Group",
    updated: "2026-08-27",
    body: String.raw`Let $A$ be an object in a category $\ms C$. The invertible elements $\op{Aut}(A)\subset \op{Mor}(A,A)$ indeed forms a group because we have the identity $\op{id}_A: A\to A$, and every morphism is invertible by definition. Moreover associativity holds by definition of a category. Hence $\op{Aut}(A)$ is indeed a group.

In the example of sets, $\op{Aut}(A)$ is the set of bijections from $A$ to itself; In the example of vector spaces, $\op{Aut}(V)$ is the set of linear isomorphisms from $V$ to itself.`
  },
  {
    id: "1-1-1-d-dimensions-characterizes-vector-spaces",
    chapter: "1",
    problem: "1.1.D",
    author: "",
    title: "Dimensions and Basis Characterize Vector Spaces",
    updated: "2026-08-27",
    body: String.raw`We show that $\ms V\to \op{f.d.Vec}_k$ is an equivalence of categories. We construct the inverse functor as follows: Simultaneously choose basis for each vector space $V\in \op{f.d.Vec}_k$ (which Vakil says we can do). Define the functor $\rho: \op{f.d.Vec}_k\to \ms V$ as follows: 

Let $V\in \op{f.d.Vec}_k$ be a vector space with chosen basis $e_1,...,e_n$. Then define $\rho(V)=k^n$. If $W$ is another vector space with basis $f_1,...,f_m$, so $\rho(W)=k^m$, and if $T:V\to W$ is a linear map, then with respect to these basis $T$ can be identified with an $m\times n$ matrix, which is a linear map $\rho(T):k^n\to k^m$. `
  },
  {
    id: "1-1-2-a-initial-and-final-objects",
    chapter: "1",
    problem: "1.2.A",
    author: "",
    title: "Initial and Final Objects",
    updated: "2026-08-28",
    body: String.raw`Let $\ms C$ be a category and $I,I'$ be two initial objects in the category. Then there is a unique map $f: I\to I'$ and a unique map $g: I'\to I$. So we get a map $g\circ f:I\to I$. But we also have $\op{id}_I: I\to I$. Hence we conclude that $g\circ f=\op{id}_I$ and similarly $f\circ g=\op{id}_{I'}$. Hence $I,I'$ are isomorphic. Similar argument shows that two final objects are isomorphic.`
  },
  {
    id: "1-1-2-b",
    chapter: "1",
    problem: "1.2.B",
    author: "",
    title: "Untitled solution",
    updated: "2026-08-28",
    body: String.raw`In both $Sets$ and $Tops$, the initial object is $\emptyset$. 

There is precisely one map $\emptyset\to X$ for any object $X$, Since there are no elements in $\emptyset$ whose images need to be specified. 

The final object is a singleton $\{*\}$. 

There is precisely one map $X\to\{*\}$ which is the constant map.

In $Rings$, both the initial and final object is the 0 ring.`
  },
  {
    id: "1-1-2-c-a-to-s-1-a-injective-iff-no-zero-divisor",
    chapter: "1",
    problem: "1.2.C",
    author: "",
    title: "$A\\to S^{-1}A$ injective iff no zero divisors in S",
    updated: "2026-08-28",
    body: String.raw`Suppose $S$ has a zero divisor $a$. Then there exists a nonzero $b$ such that $ab=0$. Then $b/1=0/1$ because $a(b\cdot 1-0\cdot 1)=0$. But $b$ is nonzero, so the map $A \to S^{-1}A$ is not injective.

Conversely, suppose the map $A\to S^{-1}A$ is not injective, which means there is a nonzero $a$ such that $a/1=0/1$. Then there exists $s\in S$ such that $s(a-0)=0$. Hence $sa=0$ ans $s$ is a zero divisor.`
  },
  {
    id: "1-1-2-d-universal-property-of-localization",
    chapter: "1",
    problem: "1.2.D",
    author: "",
    title: "Universal Property of Localization",
    updated: "2026-08-28",
    body: String.raw`We want to show that any map $\phi: A \to B$ that sends $S$ to invertible elements in $B$ factors through the localization $A\to S^{-1}A$, i.e., the following diagram commutes:
% https://q.uiver.app/#q=WzAsMyxbMCwwLCJBIl0sWzIsMCwiU157LTF9QSJdLFsxLDEsIkIiXSxbMCwyLCJcXHBoaSIsMl0sWzAsMV0sWzEsMiwiXFxleGlzdHMhXFxwc2kiLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XV0=
\[\begin{tikzcd}[cramped]
	A && {S^{-1}A} \\
	& B
	\arrow[from=1-1, to=1-3]
	\arrow["\phi"', from=1-1, to=2-2]
	\arrow["{\exists!\psi}", dashed, from=1-3, to=2-2]
\end{tikzcd}\]
Indeed, define $\psi: S^{-1}A\to B$ via $\psi(a/s)=\phi(a)\phi(s)^{-1}$. It is easy to check that this construction makes the diagram commute and is unique.`
  },
  {
    id: "1-1-2-e",
    chapter: "1",
    problem: "1.2.E",
    author: "Lazy Tianyi",
    title: "Untitled solution",
    updated: "2026-08-28",
    body: String.raw`Just follow the hint and check...

![lazy](rising-sea-images/2026-08-28/1787961508381-lazy.png)

`
  }
];
