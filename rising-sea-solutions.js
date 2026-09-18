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
    author: "Tianyi",
    title: "Automorphism Group",
    updated: "2026-08-27",
    body: String.raw`Let $A$ be an object in a category $\ms C$. The invertible elements $\op{Aut}(A)\subset \op{Mor}(A,A)$ indeed forms a group because we have the identity $\op{id}_A: A\to A$, and every morphism is invertible by definition. Moreover associativity holds by definition of a category. Hence $\op{Aut}(A)$ is indeed a group.

In the example of sets, $\op{Aut}(A)$ is the set of bijections from $A$ to itself; In the example of vector spaces, $\op{Aut}(V)$ is the set of linear isomorphisms from $V$ to itself.`
  },
  {
    id: "1-1-1-d-dimensions-characterizes-vector-spaces",
    chapter: "1",
    problem: "1.1.D",
    author: "Tianyi",
    title: "Dimensions and Basis Characterize Vector Spaces",
    updated: "2026-08-27",
    body: String.raw`We show that $\ms V\to \op{f.d.Vec}_k$ is an equivalence of categories. We construct the inverse functor as follows: Simultaneously choose basis for each vector space $V\in \op{f.d.Vec}_k$ (which Vakil says we can do). Define the functor $\rho: \op{f.d.Vec}_k\to \ms V$ as follows: 

Let $V\in \op{f.d.Vec}_k$ be a vector space with chosen basis $e_1,...,e_n$. Then define $\rho(V)=k^n$. If $W$ is another vector space with basis $f_1,...,f_m$, so $\rho(W)=k^m$, and if $T:V\to W$ is a linear map, then with respect to these basis $T$ can be identified with an $m\times n$ matrix, which is a linear map $\rho(T):k^n\to k^m$. `
  },
  {
    id: "1-1-2-a-initial-and-final-objects",
    chapter: "1",
    problem: "1.2.A",
    author: "Tianyi",
    title: "Initial and Final Objects",
    updated: "2026-08-28",
    body: String.raw`Let $\ms C$ be a category and $I,I'$ be two initial objects in the category. Then there is a unique map $f: I\to I'$ and a unique map $g: I'\to I$. So we get a map $g\circ f:I\to I$. But we also have $\op{id}_I: I\to I$. Hence we conclude that $g\circ f=\op{id}_I$ and similarly $f\circ g=\op{id}_{I'}$. Hence $I,I'$ are isomorphic. Similar argument shows that two final objects are isomorphic.`
  },
  {
    id: "1-1-2-b",
    chapter: "1",
    problem: "1.2.B",
    author: "Tianyi",
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
    author: "Tianyi",
    title: "$A\\to S^{-1}A$ injective iff no zero divisors in S",
    updated: "2026-08-28",
    body: String.raw`Suppose $S$ has a zero divisor $a$. Then there exists a nonzero $b$ such that $ab=0$. Then $b/1=0/1$ because $a(b\cdot 1-0\cdot 1)=0$. But $b$ is nonzero, so the map $A \to S^{-1}A$ is not injective.

Conversely, suppose the map $A\to S^{-1}A$ is not injective, which means there is a nonzero $a$ such that $a/1=0/1$. Then there exists $s\in S$ such that $s(a-0)=0$. Hence $sa=0$ ans $s$ is a zero divisor.`
  },
  {
    id: "1-1-2-d-universal-property-of-localization",
    chapter: "1",
    problem: "1.2.D",
    author: "Tianyi",
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
    id: "1-1-2-e-localization-with-sums-and-products",
    chapter: "1",
    problem: "1.2.E",
    author: "Tianyi",
    title: "Localization with Sums and Products",
    updated: "2026-08-29",
    body: String.raw`For (a) and (b) we prove the isomorphism exists by the universal property of localization. That is, given $\phi$ sending $S$ to invertible elements of $N$ we want to show
% https://q.uiver.app/#q=WzAsMyxbMCwwLCJNXzFcXHRpbWVzXFxjZG90c1xcdGltZXMgTV9uIl0sWzIsMCwiU157LTF9TV8xXFx0aW1lc1xcY2RvdHNcXHRpbWVzIFNeey0xfU1fbiJdLFsxLDEsIk4iXSxbMCwyLCJcXHBoaSIsMl0sWzAsMV0sWzEsMiwiXFxleGlzdHMhXFxwc2kiLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XV0=
where the verticle map is the obvious one $(m_1,...,m_n)\mapsto (m_1/1,...,m_n/1).$ Now let $e_1,...,e_n$ denote the standard basis in $M_1\times\cdots\times M_n$. Then we see that we can define
\begin{align*}
\psi(m_1/s_1,...,m_n/s_n)&=\psi(\sum_{1\leq i\leq n}(0,...,m_i/s_i,...,0))=\sum_{1\leq i\leq n}\phi(s_i)^{-1}\phi(0,...,m_i,...,0).
\end{align*}

(b) Recall that $\bigoplus_{i\in I}M_i$ is the collection of elements of the form $(m_i)_{i\in I}$ where $m_i=0$ for all but finitely many $i$. Again similar argument shows that we have a commutative diagram
% https://q.uiver.app/#q=WzAsMyxbMCwwLCJcXGJpZ29wbHVzX3tpXFxpbiBJfSBNX2kiXSxbMiwwLCJcXGJpZ29wbHVzX3tpXFxpbiBJfSBTXnstMX1NX2kiXSxbMSwxLCJOIl0sWzAsMiwiXFxwaGkiLDJdLFswLDFdLFsxLDIsIlxcZXhpc3RzIVxccHNpIiwwLHsic3R5bGUiOnsiYm9keSI6eyJuYW1lIjoiZGFzaGVkIn19fV1d
and the map $\psi$ is defined similarly as in (a). Note that the reason that we can define it using a finite sum is because $m_i=0$ for all but finitely many $i$.

(c) Take the index set $I=\mathbb N$ and $M_i=\Z$. Let $S=\Z-\{0\}$. Then $\prod_{i\in I}S^{-1}M_i=\prod_{i\in I}\Q$. But note that $(1,1/2,1/3,1/4,...)\in \prod_{i\in I}\Q$ but this element is not in $S^{-1}\prod_{i\in I}M_i=S^{-1}\prod_{i\in I}\Z$ because we cannot find the common denominator of the said element $(1,1/2,...)$ in $S$ since it is infinite.`
  },
  {
    id: "2-2-1-b-the-cotangent-space-from-germs-vanishing",
    chapter: "2",
    problem: "2.1.B",
    author: "Anson",
    title: "The Cotangent Space from Germs Vanishing at a Point",
    updated: "2026-08-28",
    body: String.raw`Consider
\[
\Phi:\mathfrak m_p\longrightarrow T_p^*X,
\qquad [f,U]\longmapsto (df)_p.
\]
It suffices to work in a coordinate chart, so we may assume that \(X=\mathbb R^n\) and \(p=0\).

To prove surjectivity, let \(\alpha\in T_0^*\mathbb R^n\) and define \(f_\alpha:\mathbb R^n\to\mathbb R\) by \(f_\alpha(x)=\alpha(x)\). Then \(f_\alpha\in\mathfrak m_0\) and \((df_\alpha)_0=\alpha\).

We now compute the kernel. If \(f\in\mathfrak m_0^2\), then by linearity it suffices to consider \(f=gh\) with \(g,h\in\mathfrak m_0\). The product rule gives
\[
(df)_0=h(0)(dg)_0+g(0)(dh)_0=0,
\]
so \(\mathfrak m_0^2\subseteq\ker\Phi\).

Conversely, suppose that \((df)_0=0\). After shrinking the domain of \(f\) around \(0\), for \(x\) in this neighborhood we have
\[
\begin{aligned}
f(x)
&=f(x)-f(0)\\
&=\int_0^1\frac{d}{dt}f(tx)\,dt\\
&=\sum_{i=1}^n x_i\int_0^1
\frac{\partial f}{\partial x_i}(tx)\,dt.
\end{aligned}
\]
Set
\[
g_i(x):=\int_0^1\frac{\partial f}{\partial x_i}(tx)\,dt.
\]
Then \(g_i(0)=\frac{\partial f}{\partial x_i}(0)=0\), so \(x_i,g_i\in\mathfrak m_0\). Since
\[
f=\sum_{i=1}^n x_i g_i,
\]
we have \(f\in\mathfrak m_0^2\). Therefore \(\ker\Phi=\mathfrak m_0^2\), and hence
\[
\mathfrak m_p/\mathfrak m_p^2\cong T_p^*X.
\]`
  },
  {
    id: "2-2-2-d-function-spaces-form-sheaves",
    chapter: "2",
    problem: "2.2.D",
    author: "Anson",
    title: "Function Spaces Form Sheaves",
    updated: "2026-08-28",
    body: String.raw`The identity axiom is immediate in each case.

Let \(\{U_i\}\) be an open cover of \(U\), and let \(f_i\in\mathcal O(U_i)\) satisfy \(f_i|_{U_i\cap U_j}=f_j|_{U_i\cap U_j}\). They glue to a function \(f\) on \(U\): for \(x\in U\), choose \(i\) with \(x\in U_i\) and set \(f(x)=f_i(x)\). Compatibility makes \(f\) well-defined, and clearly \(f|_{U_i}=f_i\). Continuity, smoothness, and real-analyticity are local properties, so \(f\) has the required regularity. The same argument applies to continuous real-valued functions on an arbitrary topological space.`
  },
  {
    id: "2-2-2-f-continuous-maps-form-a-sheaf",
    chapter: "2",
    problem: "2.2.F",
    author: "Anson",
    title: "Continuous Maps Form a Sheaf",
    updated: "2026-08-28",
    body: String.raw`Let \(\{U_i\}\) be an open cover of \(U\). For the identity axiom, if \(f,g:U\to Y\) satisfy \(f|_{U_i}=g|_{U_i}\) for all \(i\), then \(f=g\).

For gluability, let \(f_i:U_i\to Y\) be continuous maps agreeing on overlaps. Define \(f:U\to Y\) by \(f(x)=f_i(x)\) for \(x\in U_i\). This is well-defined, and \(f|_{U_i}=f_i\), so \(f\) is continuous. Thus continuous maps to \(Y\) form a sheaf.`
  },
  {
    id: "1-1-2-g-z-10-otimes-z-z-12-cong-z-2",
    chapter: "1",
    problem: "1.2.G",
    author: "Tianyi",
    title: "$\\Z/(10)\\otimes_{\\Z}\\Z/(12)\\cong \\Z/(2).$",
    updated: "2026-08-29",
    body: String.raw`This is actually an interesting problem. Note that since tensor product is bilinear, everything is actually generated by the element $x=\bar 1\otimes \bar 1$, since $\bar a\otimes \bar b=(ab)x$. Now since $10x=\overline {10}\otimes \bar 1=0$ and $12x=\bar 1\otimes \overline{12}=0$, we have
\[
0=12x-10x=2x.
\]
Hence $x$ has order divisible by 2. Therefore, the ring $\Z/(10)\otimes_{\Z}\Z/(12)$ must be isomorphic to $\Z/(2)$.`
  },
  {
    id: "2-2-2-h-pushforward-preserves-sheaves",
    chapter: "2",
    problem: "2.2.H",
    author: "Anson",
    title: "Pushforward Preserves Sheaves",
    updated: "2026-08-28",
    body: String.raw`Suppose that \(W\subseteq V\subseteq U\) are open in \(Y\). Since
\[
\pi^{-1}(W)\subseteq\pi^{-1}(V)\subseteq\pi^{-1}(U),
\]
the restriction maps of \(\mathcal F\) define those of \(\pi_*\mathcal F\), and the presheaf axioms follow from those of \(\mathcal F\).

If \(\{U_i\}\) is an open cover of \(U\), then \(\{\pi^{-1}(U_i)\}\) is an open cover of \(\pi^{-1}(U)\). Hence the identity and gluability axioms for \(\pi_*\mathcal F\) follow from those for \(\mathcal F\). Thus \(\pi_*\mathcal F\) is a sheaf whenever \(\mathcal F\) is.`
  },
  {
    id: "2-2-2-i-pushforward-induces-a-map-on-stalks",
    chapter: "2",
    problem: "2.2.I",
    author: "Anson",
    title: "Pushforward Induces a Map on Stalks",
    updated: "2026-08-28",
    body: String.raw`For $[f,V]\in(\pi_*\mathcal F)_q$, where $q\in V\subseteq Y$ and $f\in\mathcal F(\pi^{-1}(V))$, the natural morphism is

\[
(\pi_*\mathcal F)_q\to \mathcal F_p,
\qquad
[f,V]\to [f,\pi^{-1}(V)].
\]`
  },
  {
    id: "2-2-2-j-the-stalk-of-a-module-sheaf",
    chapter: "2",
    problem: "2.2.J",
    author: "Anson",
    title: "The Stalk of a Module Sheaf",
    updated: "2026-08-28",
    body: String.raw`For \([f,U]\in\mathcal O_{X,p}\) and \([a,V]\in\mathcal F_p\), define
\[
[f,U]\cdot[a,V]
=
\left[f|_{U\cap V}\,a|_{U\cap V},\,U\cap V\right].
\]
The module axioms follow from those on sections, so \(\mathcal F_p\) is an \(\mathcal O_{X,p}\)-module.`
  },
  {
    id: "1-1-2-h-tensor-product-is-right-exact",
    chapter: "1",
    problem: "1.2.H",
    author: "Tianyi",
    title: "Tensor Product is Right Exact",
    updated: "2026-08-29",
    body: String.raw`Suppose we have an exact sequence of $A$-modules
\[
M'\xrightarrow{f} M\xrightarrow{g} M''\to 0
\]
Tensor product functor $\otimes _A N$, denoted by $\otimes N$ for convienience gives a sequence
\[
M'\ot N\xrightarrow{f\ot 1} M\ot N\xrightarrow{g\ot 1} M''\ot N\to 0.
\]
We use the shorthand $F:=f\ot 1, G:=g\ot 1$. 

Since $\im f=\ker g$, it follows immediately that $\im F\subset \ker G$. 

Also, since $g$ is surjective, so is $G$: Suppose we have a pure tensor $m''\ot n\in M''\ot N$, then by surjectivity there is an $m\in M$ such that $g(m)=m''$. Hence $G(m\ot n)=m''\ot n$, and surjectivity of $G$ follows from linearity.

Hence we only need to prove $\ker G\subset \im F$. Note that we have an map
\[G^\#:M\ot N/\im F\to M''\ot N\]
induced by $G$. We claim that this is actually an isomorphism by finding an inverse. First, We construct a map 
\[
M''\times N\to M\ot N/\im F
\]
as follows: For every $(m'',n)\in M''\times N$, surjectivity of $g$ gives an element $m\in M$ such that $g(m)=m''$. Then the map is $(m'',n)\mapsto m\ot n\op{mod }\im F$. Then it follows from universal property of tensor product that we have a map
\[
M''\ot N\to M\ot N/\im F
\]
which one can check is an inverse to $G^{\#}$. Since $G^{\#}$ is an isomorphism and is induced from $G$, it follows that $\ker G=\im F$, as desired.
`
  },
  {
    id: "1-1-2n-fibered-products-of-sets",
    chapter: "1",
    problem: "1.2N",
    author: "Tianyi",
    title: "Fibered Products of Sets",
    updated: "2026-08-29",
    body: String.raw`Let $X\times_Z Y=\{(x,y)\in X\times Y: \alpha(x)=\beta(y)\}$. Suppose we have the following diagram
% https://q.uiver.app/#q=WzAsNSxbMSwxLCJYXFx0aW1lc19aIFkiXSxbMSwyLCJYIl0sWzIsMSwiWSJdLFsyLDIsIloiXSxbMCwwLCJXIl0sWzEsMywiXFxhbHBoYSJdLFsyLDMsIlxcYmV0YSIsMl0sWzAsMV0sWzAsMl0sWzQsMSwiXFxwaGkiLDIseyJjdXJ2ZSI6MX1dLFs0LDIsIlxccHNpIiwwLHsiY3VydmUiOi0yfV0sWzQsMCwiXFxyaG8iLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XV0=
We can define the map $\rho: W\to X\times_Z Y$ as $\rho(w)=(\phi(w),\psi(w)).$ It is straightforward to check that the map is well-defined (i.e., lands in the fiber product), and is unique.`
  },
  {
    id: "1-1-2o-fibered-products-in-the-category-of-open-",
    chapter: "1",
    problem: "1.2O",
    author: "Tianyi",
    title: "Fibered Products in the Category of Open Sets",
    updated: "2026-08-29",
    body: String.raw`Fiber Product is simply intersection of open sets in this category.`
  },
  {
    id: "1-1-2-p-terminal-fiber-product-is-product",
    chapter: "1",
    problem: "1.2.P",
    author: "Tianyi",
    title: "Terminal Fiber Product is Product",
    updated: "2026-08-29",
    body: String.raw`Another beautiful Saturday wasted on universal property... Let $Z$ be the terminal object in $\ms C$. Let $\mu:X\times Y\to X$ and $\nu: X\times Y\to Y$ be the projection maps of the product. Since $Z$ is terminal, universal property gives the following two commutative diagrams with maps $\phi,\psi$:

https://q.uiver.app/#q=WzAsMTAsWzEsMSwiWFxcdGltZXMgWSJdLFsxLDIsIlgiXSxbMiwxLCJZIl0sWzIsMiwiWiJdLFswLDAsIlhcXHRpbWVzX1pZIl0sWzUsMSwiWFxcdGltZXNfWiBZIl0sWzYsMSwiWSJdLFs1LDIsIlgiXSxbNiwyLCJaIl0sWzQsMCwiWFxcdGltZXMgWSJdLFswLDIsIlxcbnUiXSxbMCwxLCJcXG11IiwyXSxbMSwzXSxbMiwzXSxbNCwxLCJwcl9YIiwyLHsiY3VydmUiOjJ9XSxbNCwyLCJwcl9ZIiwwLHsiY3VydmUiOi0yfV0sWzQsMCwiXFxleGlzdHMhXFxwaGkiLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XSxbNyw4XSxbNiw4XSxbNSw3LCJwcl9YIiwyXSxbNSw2LCJwcl9ZIl0sWzksNywiXFxtdSIsMix7ImN1cnZlIjoyfV0sWzksNiwiXFxudSIsMCx7ImN1cnZlIjotMn1dLFs5LDUsIlxcZXhpc3QhXFxwc2kiLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XV0=

The claim is that $\phi,\psi$ are inverses of each other hence establishes isomorphisms $X\times Y\cong X\times_Z Y$. To see this, compose the two diagrams:
https://q.uiver.app/#q=WzAsNixbMiwyLCJYXFx0aW1lcyBZIl0sWzIsMywiWCJdLFszLDIsIlkiXSxbMywzLCJaIl0sWzEsMSwiWFxcdGltZXNfWlkiXSxbMCwwLCJYXFx0aW1lcyBZIl0sWzAsMiwiXFxudSJdLFswLDEsIlxcbXUiLDJdLFsxLDNdLFsyLDNdLFs0LDEsInByX1giLDEseyJjdXJ2ZSI6Mn1dLFs0LDIsInByX1kiLDEseyJjdXJ2ZSI6LTJ9XSxbNCwwLCJcXHBoaSJdLFs1LDEsIlxcbXUiLDAseyJjdXJ2ZSI6NX1dLFs1LDIsIlxcbnUiLDIseyJjdXJ2ZSI6LTV9XSxbNSw0LCJcXHBzaSJdXQ==

Universal property of the product implies $\phi\psi=\id_{X\times Y}$, similarly universal property of fiber product implies $\psi\phi=\id_{X\times_Z Y}$.
`
  },
  {
    id: "1-1-2-q-towers-of-cartisian-diagrams-is-cartisia",
    chapter: "1",
    problem: "1.2.Q",
    author: "Tianyi",
    title: "Towers of Cartisian Diagrams is Cartisian",
    updated: "2026-08-30",
    body: String.raw`Here's the complete diagram:
% https://q.uiver.app/#q=WzAsNyxbMSwxLCJVIl0sWzIsMSwiViJdLFsxLDIsIlciXSxbMiwyLCJYIl0sWzEsMywiWSJdLFsyLDMsIloiXSxbMCwwLCJXJyJdLFswLDEsImYiXSxbMiwzLCJnIl0sWzEsMywiXFxnYW1tYSJdLFswLDIsIlxcYWxwaGEiXSxbMiw0LCJcXGJldGEiXSxbMyw1LCJcXGRlbHRhIl0sWzQsNSwiaCJdLFs2LDQsIlxcbXUiLDIseyJjdXJ2ZSI6M31dLFs2LDEsIlxcbnUiLDAseyJjdXJ2ZSI6LTJ9XSxbNiwyLCJcXHJobyIsMSx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dLFs2LDAsIlxcZXhpc3QhXFx0YXUiLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XV0=

Let me explain: Suppose we are given maps $\mu,\nu$. Note we have a map $\gamma\nu: W'\to X$, this gives a unique map $\rho: W'\to W$ because the lower square is Cartesian. Now we have map $\rho: W'\to W, \nu: W'\to V$, so this gives a unique map $\tau: W'\to U$ because the upper square is also Cartesian. 

To verify the tower is indeed Cartesian, we need to show $\nu=\tau f$ (checked because upper square is Cartesian) and $\mu=\beta\alpha\tau$. Chasing through the construction shows that $\beta\alpha\tau=\beta\rho=\mu$, as desired.`
  },
  {
    id: "1-1-2-s-diagonal-base-change-diagram-incomplete",
    chapter: "1",
    problem: "1.2.S",
    author: "Tianyi",
    title: "Diagonal Base Change Diagram",
    updated: "2026-08-30",
    body: String.raw`We first need two preliminary results:

$\textbf{Lemma 1.}$ Let $A,B,C$ be objects in a category $\mc C$, and let $S$ be an arbitrary object in $\mc C$ as well. Then we have $$\Hom(S,A\times_C B)=\Hom(S,A)\times_{\Hom(S,C)}\Hom(S,B).$$

$\textbf{Proof:}$ Note that $\Hom(S,A\times_C B)$ is the collection of data $(f:S\to A, g: S\to B)$ that agrees when maps to $C$ using $A\to C, B\to C$. But this is precisely the right hand side, where $\Hom(S,A)\to \Hom(S,C)$ is by postcomposing $A\to C$, and similarly for $\Hom(S,B)\to \Hom(S,C)$. Q.E.D.


$\textbf{Lemma 2. }$A commutative square $\square$ in a Category $\mc C$ is Cartesian iff for every object $S\in \mc C$ the square $\Hom(S,\square)$ is Cartesian.
 

$\textbf{Proof: }$If $\square$ is Cartesian, then $\Hom(S,\square)$ is Cartesian by the previous lemma. Hence it suffices to consider the converse. Suppose we have a commutative square
        % https://q.uiver.app/#q=WzAsNCxbMCwwLCJBIl0sWzEsMCwiQiJdLFswLDEsIkMiXSxbMSwxLCJEIl0sWzAsMSwiXFxiZXRhIl0sWzAsMiwiXFxhbHBoYSIsMl0sWzIsMywiXFxtdSIsMl0sWzEsMywiXFxudSJdXQ==
        \[\begin{tikzcd}[cramped]
        	A & B \\
        	C & D
        	\arrow["\beta", from=1-1, to=1-2]
        	\arrow["\alpha"', from=1-1, to=2-1]
        	\arrow["\nu", from=1-2, to=2-2]
        	\arrow["\mu"', from=2-1, to=2-2]
        \end{tikzcd}\]
        such that for every object $S\in \mc C$, the square
        % https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG9wZXJhdG9ybmFtZXtIb219KFMsQSkiXSxbMSwwLCJcXG9wZXJhdG9ybmFtZXtIb219KFMsQikiXSxbMCwxLCJcXG9wZXJhdG9ybmFtZXtIb219KFMsQykiXSxbMSwxLCJcXG9wZXJhdG9ybmFtZXtIb219KFMsRCkiXSxbMCwxLCJcXGJldGFcXGNpcmMiXSxbMCwyLCJcXGFscGhhXFxjaXJjIiwyXSxbMiwzLCJcXG11XFxjaXJjIiwyXSxbMSwzLCJcXG51XFxjaXJjIl1d
        \[\begin{tikzcd}[cramped]
        	{\operatorname{Hom}(S,A)} & {\operatorname{Hom}(S,B)} \\
        	{\operatorname{Hom}(S,C)} & {\operatorname{Hom}(S,D)}
        	\arrow["{\beta\circ}", from=1-1, to=1-2]
        	\arrow["{\alpha\circ}"', from=1-1, to=2-1]
        	\arrow["{\nu\circ}", from=1-2, to=2-2]
        	\arrow["{\mu\circ}"', from=2-1, to=2-2]
        \end{tikzcd}\]
        is Cartesian. Then we claim that the original square is Cartesian. Indeed, for any object $S\in \mc C$ with maps $f:S\to C, g:S\to B$ with $\mu\circ  f=\nu\circ g:S\to D$, by assumption there is a map $\rho: S\to A$ such that $\nu\circ\beta\circ \rho=\mu\circ\alpha\circ \rho$. Furthermore, by the previous identification $\Hom(S,A)=\Hom(S,C)\times_{\Hom(S,D)}\Hom(S,B)$, this condition is equivalent to $g=\beta\circ \rho, f=\alpha\circ \rho$. Hence the original square is indeed Cartesian. Q.E.D.


Using the two results above, we see that up to relabeling, we just need to show the diagram
    % https://q.uiver.app/#q=WzAsNCxbMCwwLCJYXzFcXHRpbWVzX1kgWF8yIl0sWzEsMCwiWF8xXFx0aW1lc19aIFhfMiJdLFswLDEsIlkiXSxbMSwxLCJZXFx0aW1lc19aIFkiXSxbMCwxXSxbMSwzXSxbMCwyXSxbMiwzXV0=
    \[\begin{tikzcd}[cramped]
    	{X_1\times_Y X_2} & {X_1\times_Z X_2} \\
    	Y & {Y\times_Z Y}
    	\arrow[from=1-1, to=1-2]
    	\arrow[from=1-1, to=2-1]
    	\arrow[from=1-2, to=2-2]
    	\arrow[from=2-1, to=2-2]
    \end{tikzcd}\]
    is Cartesian but now everything are sets, and we know what fiber product in set means. This is a routine exercise to check: Let our given morphisms be $\pi_1:X_1\to Y,\pi_2:X_2\to Y, \mu: Y\to Z$. Then the maps are
    \begin{align*}
        X_1\times_Y X_2\to Y&\qquad (x_1,x_2)\mapsto \pi_1(x_1)=\pi_2(x_2)\\
        Y\to Y\times_Z Y&\qquad y\mapsto (y,y)\\
        X_1\times_Y X_2\to X_1\times_Z X_2&\qquad (x_1,x_2)\mapsto (x_1,x_2)\\
        X_1\times_Z X_2\to Y\times_Z Y&\qquad (x_1,x_2)\mapsto (\pi_1(x_1),\pi_2(x_2)).
    \end{align*}
    It is immediate to check the diagram commutes, because $\pi_1(x_1)=\pi_2(x_2)$ by assumption, since $(x_1,x_2)\in X_1\times_Y X_2$.
\end{enumerate}

`
  },
  {
    id: "1-1-2-t-coproduct-is-sets-is-disjoint-union",
    chapter: "1",
    problem: "1.2.T",
    author: "Tianyi",
    title: "Coproduct is Sets is Disjoint Union",
    updated: "2026-08-30",
    body: String.raw`Recall that in $Sets$, elements in $X_1\coprod X_2$ are given by elements of the form $(x_1,1),(x_2,2)$ where $x_1\in X_1, x_2\in X_2$. Thus of course we have a diagram
https://q.uiver.app/#q=WzAsNCxbMCwwLCJXIl0sWzEsMSwiWF8xXFxjb3Byb2QgWF8yIl0sWzEsMiwiWF8xIl0sWzIsMSwiWF8yIl0sWzIsMV0sWzMsMV0sWzEsMCwiXFxleGlzdHMhXFxyaG8iLDEseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XSxbMiwwLCJcXHBoaSJdLFszLDAsIlxccHNpIiwyXV0=
where $\rho(x_1,1)=\phi(x_1)$ and $\rho(x_2,2)=\psi(x_2).$`
  },
  {
    id: "1-1-2-u-tensor-product-is-fibered-coproduct",
    chapter: "1",
    problem: "1.2.U",
    author: "Tianyi",
    title: "Tensor Product is Fibered Coproduct",
    updated: "2026-08-30",
    body: String.raw`We have the following diagram
https://q.uiver.app/#q=WzAsNSxbMiwxLCJDIl0sWzEsMiwiQiJdLFsxLDEsIkJcXG90aW1lc19BIEMiXSxbMiwyLCJBIl0sWzAsMCwiUiJdLFszLDFdLFszLDBdLFswLDJdLFsxLDJdLFsxLDQsIlxcbXUiXSxbMCw0LCJcXG51IiwyXSxbMiw0LCJcXGV4aXN0IVxccmhvIiwxLHsic3R5bGUiOnsiYm9keSI6eyJuYW1lIjoiZGFzaGVkIn19fV1d
where the map $\rho: B\ot_A C\to R$ is defined by $\rho(b\ot c)=\mu(b)\ot \nu(c)$ and extended linearly.`
  },
  {
    id: "1-1-3-c-limits-in-sets",
    chapter: "1",
    problem: "1.3.C",
    author: "Tianyi",
    title: "Limits in $Sets$",
    updated: "2026-08-31",
    body: String.raw`The set
\[
\left\{(a_i)_{i\in \ms I}\in\prod_{i\in \ms I}A_i: F(m)(a_j)=a_k\; \forall m\in \op{Mor}_{\ms I}(j,k)\subset \op{Mor}(\ms I)\right\}
\]
with the obvious projection $\pi_i$ to each $A_i$ is satisfies $\pi_k=F(m)\pi_j$ for every $m:j\to k$ by definition, and the universal property of the limit is satisfied by the above essentially due to the universal property of the product $\prod_{i\in \ms I}A_i$.`
  },
  {
    id: "1-1-3-e-colimit-in-sets",
    chapter: "1",
    problem: "1.3.E",
    author: "Tianyi",
    title: "Colimit in $Sets$",
    updated: "2026-09-01",
    body: String.raw`The long equivalence relation in the quotient is to force the object to satisfy the coherence relation. The universal property of colimit follows from the universal property of coproduct.`
  },
  {
    id: "1-1-4-c-tensor-hom-bijection",
    chapter: "1",
    problem: "1.4.C",
    author: "Tianyi",
    title: "Tensor Hom Bijection",
    updated: "2026-09-01",
    body: String.raw`We construct a bijection
\[
\Hom(M\ot N, P)\longleftrightarrow \Hom(M,\Hom(N,P))
\]
as follows: Given a map $M\ot N\to P$, composing with the natural map $M\times N\to M\ot N$ gives a bilinear map $M\times N\to P$, which is an element of $\Hom(M,\Hom(N,P))$.  Conversely, given an element in $\Hom(M,\Hom(N,P))$, i.e., a bilinear map $M\times N\to P$, universal property of tensor product gives a map $M\ot N\to P$. It is easy to verify that these two operations are inverses to each other.`
  },
  {
    id: "1-1-4-d-tensor-hom-adjunction",
    chapter: "1",
    problem: "1.4.D",
    author: "Tianyi",
    title: "Tensor Hom Adjunction",
    updated: "2026-09-01",
    body: String.raw`We will only show one of the two commutative diagrams. Suppose we have a map $f:M\to M'$. We want to show the diagram
https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG9wZXJhdG9ybmFtZXtIb219KE0nXFxvdGltZXMgTiwgUCkiXSxbMSwwLCJcXG9wZXJhdG9ybmFtZXtIb219KE1cXG90aW1lcyBOLFApIl0sWzAsMSwiXFxvcGVyYXRvcm5hbWV7SG9tfShNJyxcXG9wZXJhdG9ybmFtZXtIb219KE4sUCkpIl0sWzEsMSwiXFxvcGVyYXRvcm5hbWV7SG9tfShNLFxcb3BlcmF0b3JuYW1le0hvbX0oTixQKSkiXSxbMCwxXSxbMSwzXSxbMCwyXSxbMiwzXV0=
commutes, where all the maps are the obvious ones. Let us chase through the definition in 1.4.C: Starting from the upper left corner suppose we have a map $\alpha: M'\ot N\to P$. Then going right gives a map $M\ot N\to M'\ot N\to P$ induced by $f:M\to M'$. Going down gives a bilinear map 
\[M\times N\to M\ot N\to M'\ot N\to P.\]
This map is given by
\[
(m,n)\mapsto m\ot n\mapsto f(m)\ot n\mapsto \alpha(f(m)\ot n).
\]
Now if we first go down we get a map $M'\times N\to M'\ot N\to P$, then go right gives a map
\[
M\times N\to M'\times N\to M'\ot N\to P
\]
given by
\[
(m,n)\mapsto (f(m),n)\mapsto f(m)\ot n\mapsto \alpha(f(m)\ot n)
\]
which evidently agrees with the previous map displayed above. So the diagram commutes. The commutativity of the other diagram follows from a similar argument.
`
  },
  {
    id: "1-1-4-e-hom-a-n-ot-b-a-m-cong-hom-b-n-m-b",
    chapter: "1",
    problem: "1.4.E",
    author: "Tianyi",
    title: "$\\Hom_A(N\\ot_B A,M)\\cong \\Hom_B(N,M_B)$",
    updated: "2026-09-01",
    body: String.raw`We will only show that $\Hom_A(N\ot_B A,M)\cong \Hom_B(N,M_B)$ by constructing a bijection. I'll omit checking the naturality diagram...

Let $\phi: B\to A$ be the given change of coefficient map. Start with a map $\alpha: N\ot_B A\to M$. We construct a map $\beta: N\to M_B$ as follows: Let $\beta: n\mapsto n\ot_B 1_A\mapsto \alpha(n\ot_B 1_A).$

Conversely, given $\beta: N\to M_B$. We define $\alpha: N\ot_B A\to M$ as $\alpha: n\ot_B a\mapsto n\cdot\phi(a)\mapsto \beta(n\cdot \phi(a)).$ It is not hard to verify that these two operations are bijections.`
  },
  {
    id: "1-1-5-a-two-exact-sequences-of-a-complex",
    chapter: "1",
    problem: "1.5.A",
    author: "Tianyi",
    title: "Two Exact Sequences of a Complex",
    updated: "2026-09-01",
    body: String.raw`The first exact sequence
\[
0\to \im f^{i}\to A^{i+1}\to \op{coker}f^{i}\to 0
\]
is simply the inclusion followed by quotient. That is, $\op{coker}f^{i}\cong A^{i+1}/\im f^{i}$ in an Abelian category. To see this, let $\alpha:A\to B$ be a morphism in an Abelian category. The definition we propose for cokernel satisfies the universal property diagram
https://q.uiver.app/#q=WzAsNCxbMSwxLCJCIl0sWzIsMSwiQSJdLFswLDEsIkIvXFxvcGVyYXRvcm5hbWV7aW19XFxhbHBoYSJdLFswLDAsIlciXSxbMSwwLCJcXGFscGhhIiwyXSxbMCwyXSxbMCwzXSxbMSwzLCIwIiwyLHsiY3VydmUiOjF9XSxbMSwyLCIwIiwwLHsiY3VydmUiOi0yfV0sWzIsMywiXFxleGlzdCEiLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XV0=
Hence is uniquely isomorphic to $\op{coker}\alpha$ by the universal property of the cokernel. The second exact sequence
\[
0\to H^i(A^\bullet)\to \op{coker}f^{i-1}\to \im f^i\to 0
\]
is inclusion $\ker f^i/\im f^{i-1}\to A_i/\im f^{i-1}$ composed with quotient since
\[
\frac{\op{coker}f^{i-1}}{H^i(A^\bullet)}=\frac{A_i/\im f^{i-1}}{\ker f^i/\im f^{i-1}}\cong \frac{A_i}{\ker f^i}\cong \im f^i
\]
by the third and first isomorphism theorems.`
  },
  {
    id: "1-1-5-b-euler-characteristics-of-a-complex",
    chapter: "1",
    problem: "1.5.B",
    author: "Tianyi",
    title: "Euler Characteristics of a Complex",
    updated: "2026-09-02",
    body: String.raw`To show that $\sum_i (-1)^i\dim A^i=\sum_i (-1)^i h^i(A)$, we use the two exact sequences (1.5.6.3) in Vakil. This gives
\[\dim A^i=\dim \ker f^i+\dim \im f^i=\dim \im f^{i-1}+h^i(A)+\dim \im f^i.\]
Hence we obtain
\begin{align*}
\sum_i (-1)^i \dim A^i&=\sum_i (-1)^i h^i(A)+\sum_i (-1)^i [\dim \im f^i+\dim \im f^{i-1}]=\sum_i (-1)^i h^i(A).
\end{align*}
as the last sum cancels out due to a standard telescoping argument.`
  },
  {
    id: "1-1-5-e-homotopic-maps-gives-same-map-on-homolog",
    chapter: "1",
    problem: "1.5.E",
    author: "Tianyi",
    title: "Homotopic Maps Gives Same Map on Homology",
    updated: "2026-09-02",
    body: String.raw`Since $f-g=dw+wd$ on the level of chains, and since every element $[\alpha]\in H^*(A)$ is represented by a closed (i.e. $d\alpha=0$) representative $\alpha\in A^*$, on the level of homology we have
\[
(f_*-g_*)([\alpha])=[dw\alpha+wd\alpha]=0,
\]
where the first term $dw\alpha=0$ is because it is a boundary, and the second term is zero because $d\alpha=0$ since $\alpha$ is closed.
`
  },
  {
    id: "2-2-1-a-germ-is-a-local-ring",
    chapter: "2",
    problem: "2.1.A",
    author: "Tianyi",
    title: "Germ is a Local Ring",
    updated: "2026-09-03",
    body: String.raw`We show $\mc O_p$ is local by showing $\mf m_p$ is the only maximal ideal. Let $(\varphi,U)$ be a representative of an element in $\mc O_p\setminus \mf m_p$, where $U$ is an open set containing $p$ on which $\varphi$ is nonzero (by continuity of $\varphi$). Then the image of $(\varphi^{-1},U)$ in $\mc O_p\setminus \mf m_p$ is an inverse of $(\varphi,U)$.`
  },
  {
    id: "2-2-2-a-presheaf-is-a-contravariant-functor",
    chapter: "2",
    problem: "2.2.A",
    author: "Tianyi",
    title: "Presheaf is a Contravariant Functor",
    updated: "2026-09-12",
    body: String.raw`Indeed, for every open set $U$ the functor assigns $\mc F(U)$, and for every inclusion $U\hookrightarrow{}V$ we have restriction map $\mc F(V)\to \mc F(U)$. The remaining properties are easy to verify.`
  },
  {
    id: "2-2-3-a-morphisms-of-pre-sheaves-induce-morphism",
    chapter: "2",
    problem: "2.3.A",
    author: "Tianyi",
    title: "Morphisms of (Pre)Sheaves Induce Morphisms of Stalks",
    updated: "2026-09-12",
    body: String.raw`Suppose we have a map $\phi:\mc F\to \mc G$. Let $[f,U]\in \mc F_p$ where $p\in U\subset X$, let $\phi_U: \mc F(U)\to \mc G(U)$. Then we define the induced map $\mc F_p\to \mc G_p$ is given as $[f,U]\mapsto [\phi_U(f),U]\in \mc G_p$. Note that this is well-defined, for if we use another representative we can always pass to common intersection of the defining open sets.`
  },
  {
    id: "2-2-3-b-pushforward-is-functorial",
    chapter: "2",
    problem: "2.3.B",
    author: "Tianyi",
    title: "Pushforward is Functorial",
    updated: "2026-09-12",
    body: String.raw`Let $\pi: X\to Y$ be a continuous map. Suppose $\mc F$ is a sheaf on $X$, i.e., an object in $Sets_X$. 

We first show that $\pi_*\mc F$ is a sheaf on $Y$. Gluability follows since if $\cup_{i\in I}U_i$ is an open cover of $Y$ then $\cup_{i\in I}\pi^{-1}(U_i)$ is an open cover of $X$ and we use gluability of $\mc F$ on $X$. Similarly identity axiom also holds.

Next, suppose we have morphism $\phi: \mc F\to \mc G$ of sheaves on $X$. Then we get $\pi_*\mc F\to \pi_*\mc G$ given by $\mc F(\pi^{-1}U)\to \mc G(\pi^{-1}U)$ for every open set $U\subset Y$. It is easy to check that this is indeed a morphism of sheaves.`
  },
  {
    id: "2-2-3-c-sheaf-hom",
    chapter: "2",
    problem: "2.3.C",
    author: "Tianyi",
    title: "Sheaf  Hom",
    updated: "2026-09-13",
    body: String.raw`Let $\mc F,\mc G$ be two sheaves. We show that $\mc{Hom}(\mc F,\mc G)$ is a sheaf. By definition, for every open $U\hookrightarrow X$, the assignment is
\[
U\mapsto \op{Mor}(\mc F|_U,\mc G|_U).
\]
Given open containments $U\hookrightarrow V$, we have an evident restriction map $\op{Mor}(\mc F|_V,\mc G|_V)\to \op{Mor}(\mc F|_U,\mc G|_U)$ from the property of sheaf morphisms $\mc F|_V\to \mc G|_V$. These restrictions are compatible with each other, for if we have opens $U\hookrightarrow V\hookrightarrow W$, then for $O\subset W, O'\subset V, O''\subset U$ open, we have a commutative diagram
https://q.uiver.app/#q=WzAsNixbMCwwLCJcXG1hdGhjYWx7Rn0oTykiXSxbMSwwLCJcXG1hdGhjYWwgRyhPKSJdLFswLDEsIlxcbWF0aGNhbHtGfShPJykiXSxbMCwyLCJcXG1hdGhjYWx7Rn0oTycnKSJdLFsxLDEsIlxcbWF0aGNhbCBHKE8nKSJdLFsxLDIsIlxcbWF0aGNhbCBHKE8nJykiXSxbMCwxLCJcXHBoaV9PIl0sWzIsNCwiXFxwaGlfe08nfSJdLFszLDUsIlxccGhpX3tPJyd9Il0sWzAsMiwiXFxyaG9fe08sTyd9IiwyXSxbMiwzLCJcXHJob197TycsTycnfSIsMl0sWzEsNCwiXFxyaG9fe08sTyd9Il0sWzQsNSwiXFxyaG9fe08nLE8nJ30iXSxbMCwzLCJcXHJob197TyxPJyd9IiwyLHsiY3VydmUiOjV9XSxbMSw1LCJcXHJob197TyxPJyd9IiwwLHsiY3VydmUiOi01fV1d
Here, $\rho$'s are restriction maps. Hence it is not hard to verify that the sheaf Hom is a presheaf. 

Next we show that it is in fact a sheaf. This is where we use $\mc F,\mc G$ are sheaves: To prove gluability: Let $U\hookrightarrow X$ be open and $\cup_{i\in I}U_i=U$ is an open cover of $U$. Let $\phi_i\in \op{Mor}(\mc F|_{U_i},\mc G|_{U_i})$ be compatible morphisms. Then for any $O\hookrightarrow U$ open, and for any $\alpha\in \mc F(O)$, since $\phi_i|_{O\cap U_i\cap U_j}(\alpha)=\phi_j|_{O\cap U_i\cap U_j}(\alpha)\in \mc G(O\cap U_i\cap U_j)$ for all $i,j\in I$, these glue to a unique section $\phi_O(\alpha)\in \mc G(O)$ since $\mc G$ is a sheaf. This defines $\phi_O$ uniquely, proving gluability. Identity axiom can be proved similarly.


 `
  },
  {
    id: "2-2-3-e-kernel-presheaf",
    chapter: "2",
    problem: "2.3.E",
    author: "Tianyi",
    title: "Kernel Presheaf",
    updated: "2026-09-13",
    body: String.raw`Let $\phi:\mc F\to \mc G$ be a morphism of presheaves. As suggested we define $\ker\phi: U\mapsto \ker\phi(U)$. To show that restriction maps are defined, we follow the hint and consider the below diagram:
https://q.uiver.app/#q=WzAsOCxbMCwwLCIwIl0sWzEsMCwiXFxrZXIgXFxwaGkoVikiXSxbMiwwLCJcXG1hdGhjYWx7Rn0oVikiXSxbMywwLCJcXG1hdGhjYWwgRyhWKSJdLFswLDEsIjAiXSxbMSwxLCJcXGtlciBcXHBoaShVKSJdLFsyLDEsIlxcbWF0aGNhbCBGKFUpIl0sWzMsMSwiXFxtYXRoY2FsIEcoVSkiXSxbMCwxXSxbMSwyXSxbMiwzLCJcXHBoaShWKSJdLFs2LDcsIlxccGhpKFUpIiwyXSxbNSw2XSxbNCw1XSxbMiw2LCJcXHJob197VixVfSIsMl0sWzMsNywiXFxyaG9fe1YsVX0iXSxbMSw1LCJcXGV4aXN0ISIsMix7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dXQ==
The map is constructed as follows: For every $\alpha\in \ker\phi(V)$, view $\alpha\in \ker \phi(V)\hookrightarrow \mc F(V)$. Since the rightmost square commutes and the rows are exact, $\phi(U)\circ \rho_{V,U}(\alpha)$, hence $\rho_{V,U}(\alpha)$ is in the image of the map $\ker\phi(U)\to \mc F(U)$, i.e., there exists some $\beta\in \ker\phi(U)$ that maps to $\rho_{V,U}(\alpha)$. Then define the morphism to be $\alpha\mapsto \beta$. It is a routine verification that this map is unique and the diagram commutes. 

To show the composition of restriction satisfies the desired property, let $U\hookrightarrow V\hookrightarrow W$ be inclusion of opens. We have the following diagram with commutative squares and exact rows:

https://q.uiver.app/#q=WzAsMTIsWzAsMSwiMCJdLFsxLDEsIlxca2VyIFxccGhpKFYpIl0sWzIsMSwiXFxtYXRoY2Fse0Z9KFYpIl0sWzMsMSwiXFxtYXRoY2FsIEcoVikiXSxbMCwyLCIwIl0sWzEsMiwiXFxrZXIgXFxwaGkoVSkiXSxbMiwyLCJcXG1hdGhjYWwgRihVKSJdLFszLDIsIlxcbWF0aGNhbCBHKFUpIl0sWzAsMCwiMCJdLFsxLDAsIlxca2VyXFxwaGkoVykiXSxbMiwwLCJcXG1hdGhjYWwgRihXKSJdLFszLDAsIlxcbWF0aGNhbCBHKFcpIl0sWzAsMV0sWzEsMl0sWzUsNl0sWzQsNV0sWzIsNiwiXFxyaG9fe1YsVX0iLDJdLFszLDcsIlxccmhvX3tWLFV9Il0sWzgsOV0sWzksMTBdLFsxMCwxMV0sWzksMV0sWzEwLDIsIlxccmhvX3tXLFZ9IiwyXSxbMTEsMywiXFxyaG9fe1csVn0iXSxbMSw1XSxbMiwzXSxbNiw3XV0=

Now the last two columns composes as $\rho_{W,U}$, hence the composition of the restriction maps of kernels must be the restriction map of kernel $\ker\phi(W)\to \ker\phi(U)$ by uniqueness of restriction maps.`
  },
  {
    id: "2-2-3-i-kernel-sheaf",
    chapter: "2",
    problem: "2.3.I",
    author: "Tianyi",
    title: "Kernel Sheaf",
    updated: "2026-09-13",
    body: String.raw`If $\phi:\mc F\to \mc G$ is a morphism of sheaves, then $\ker\phi$ is a sheaf: We will verify gluability since identity follows similarly. Let $U=\cup_{i\in I}U_i$. Let $\alpha_i\in \ker\phi(U_i)$ be compatible sections. Then using $\ker\phi(U_i)\hookrightarrow \mc F(U_i)$ we get compatible sections $\alpha_i\in \mc F(U_i)$. Hence they glue to a unique section $\alpha\in \mc F(U)$ since $\mc F$ is a sheaf. We show that this is indeed an element of the kernel: Since $\phi(\alpha)\in \mc G(U)$ satisfies that $\phi(\alpha)|_{U_i}=\phi|_{U_i}(\alpha|_{U_i})=0\in \mc G(U_i)$, we conclude that $\phi(\alpha)=0$ since $\mc G$ is a sheaf. Hence $\alpha\in \ker \phi(U)$. It is clear by construction that $\alpha|_{U_i}=\alpha_i$.`
  },
  {
    id: "2-2-3-j-exponential-presheaf-sequence",
    chapter: "2",
    problem: "2.3.J",
    author: "Tianyi",
    title: "Exponential Presheaf Sequence",
    updated: "2026-09-13",
    body: String.raw`We first show that $0\to \underline{\Z}\to \mc O_X\to \mc F\to 0$ is an exact sequence of presheaves of Abelian groups. By definition, this means for every $U\subset X$ open the section of the sequence over $U$ is exact. By definition,
    \[
    \mc F(U):=\{f:U\to \C^*\text{ holomorphic}: \exists g: U\to \C\text{ holomorphic s.t.}\exp(2\pi i g)=f\}.
    \]
    Note that $\mc O_X(U)\to \mc F$ surjects because $g\mapsto f$ for any $f\in \mc F(U)$. Clearly $\underline{\Z}(U)\to \mc O_X(U)$ is an injection. Finally, we note that by standard results in complex analysis, a holomorphic function $g:U\to \C$ satisfies $\exp(2\pi i g)=0$ iff $g$ is integer valued, which shows exactness of the sequence at $\exp(2\pi i(-)):\mc O_X(U)\to \mc F$.

The presheaf $\mc F$ is not a sheaf because it does not satisfy gluability axiom: For example, I claim that the function $f(z)=z$ defined on $\C^*$ does not admit a global holomorphic log. 

    For the sake of contradiction, let's assume $g$ is a globally defined holomorphic log of $f$. That is, $\exp(g(z))=z$. Differentiating gives $1=\exp(g(z))g'(z)=zg'(z)$, so $g'(z)=1/z$. But since $g$ is holomorphic, $\bar \del g=0$. Hence $dg=(\del+\bar\del)g=\del g=g'(z)dz$. Therefore around any closed loop $\gamma\subset \C^*$ we must have
    \[
    \int_\gamma g'(z)dz=\int_\gamma dg=\int_{\del \gamma}g=0
    \]
    by Stokes' theorem. However, if you take $\gamma$ to be the unit circle $C$ in $\C^*$ then
    \[
    \int_\gamma g'(z)dz=\int_C\frac{dz}{z}=\int_0^{2\pi}\frac{ie^{i\theta}d\theta}{e^{i\theta}}=2\pi i\neq 0.
    \]
    This is the desired contradiction.`
  },
  {
    id: "2-2-4-a-sections-are-determined-by-germs",
    chapter: "2",
    problem: "2.4.A",
    author: "Tianyi",
    title: "Sections are Determined by Germs",
    updated: "2026-09-13",
    body: String.raw`We show that the natural map $\mc F(U)\to \prod_{p\in U}\mc F_p$ defined by $s\mapsto (s_p)_{p\in U}$ is injective. Suppose we have two sections $s,t\in \mc F(U)$ such that $(s_p)=(t_p)$. Then for every $p$, we can find open sets $U_p\hookrightarrow U$ such that $s|_{U_p}=t|_{U_p}$. But note that $\{U_p\}_{p\in U}$ for an open cover of $U$. Hence by the identity axiom, we conclude that $s=t$.`
  },
  {
    id: "2-2-4-b-compatible-germs-come-from-sections",
    chapter: "2",
    problem: "2.4.B",
    author: "Tianyi",
    title: "Compatible Germs Come From Sections",
    updated: "2026-09-13",
    body: String.raw`Let $(s_p)_{p\in U}\in \prod_{p\in U}\mc F_p$ be a compatible germ. Let $U_p$ be the open containing $p$ in $U$ such that there is some $\tilde s_p\in \mc F(U_p)$ such that the germ of $\tilde s_p$ at all $q\in U_p$ is $s_q$. Now suppose we have $\td s_{p'}\in \mc F(U_{p'})$, with $U_p\cap U_{p'}\neq \emptyset$ and $p''\in U_p\cap U_{p'}$ is an arbitrary point. Now since $\td s_p,\td s_{p'}$ agrees in a neighborhood of $p''$ and $p''\in U_p\cap U_{p'}$ is arbitrary, by the identity axiom of the sheaf $\mc F|_{U_p\cap U_{p'}}$, we see that $\td s_p, \td s_{p'}$ agrees on $U_p\cap U_{p'}$. Hence by gluability of the sheaf $\mc F|_U$ with open cover $\{U_p\}_{p\in U}$, we see that $(s_p)_{p\in U}\prod_{p\in U}\mc F_p$ must come from some section $s\in \mc F(U)$.`
  },
  {
    id: "2-2-4-c-morphisms-are-determined-by-stalks",
    chapter: "2",
    problem: "2.4.C",
    author: "Tianyi",
    title: "Morphisms are Determined by Stalks",
    updated: "2026-09-13",
    body: String.raw`Indeed, let $\phi_1,\phi_2: \mc F\to \mc G$ be morphisms of presheaves and $\mc G$ is a sheaf, and these two maps induces the same maps on each stalk. The following diagram commutes by how we constructed morphism on stalks:
https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG1hdGhjYWwgRihVKSJdLFsxLDAsIlxcbWF0aGNhbCBHKFUpIl0sWzAsMSwiXFxwcm9kX3twXFxpbiBVfVxcbWF0aGNhbCBGX3AiXSxbMSwxLCJcXHByb2Rfe3BcXGluIFV9XFxtYXRoY2FsIEdfcCJdLFswLDFdLFswLDJdLFsxLDMsIiIsMCx7InN0eWxlIjp7InRhaWwiOnsibmFtZSI6Imhvb2siLCJzaWRlIjoiYm90dG9tIn19fV0sWzIsM11d
Suppose $s\in \mc F(U)$. Then $(\phi_1(s)_p)=(\phi_2(s)_p)\in \prod_{p\in U}\mc G_p$, and we already showed the right vertical map is injective, so $\phi_1(s)=\phi_2(s)$, hence $\phi_1=\phi_2$ as desired.`
  },
  {
    id: "2-2-4-d-isomorphisms-are-determined-by-stalks",
    chapter: "2",
    problem: "2.4.D",
    author: "Tianyi",
    title: "Isomorphisms are Determined by Stalks",
    updated: "2026-09-13",
    body: String.raw`Let $\phi:\mc F\to \mc G$ be a morphism of sheaves. We show that $\phi:\mc F\to \mc G$ is an isomorphism iff it induces isomorphisms on every stalk. First, if $\phi:\mc F\to \mc G$ is an isomorphism then clearly it induces isomorphism on each stalk. 

Conversely, suppose $\phi:\mc F\to \mc G$ induces isomorphism on every stalk. Let $U\hookrightarrow X$ be any open set. Exercise 2.4.C already shows that $\phi(U):\mc F(U)\to \mc G(U)$ is injective, hence it remains to show that it is surjective. To this end, let $t\in \mc G(U)$ be a section with $(t_p)\in \prod_{p\in U}\mc G_p$ be the induced element on the stalks. We have a commutative diagram with vertical maps being injections:
https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG1hdGhjYWwgRihVKSJdLFsxLDAsIlxcbWF0aGNhbCBHKFUpIl0sWzAsMSwiXFxwcm9kX3twXFxpbiBVfVxcbWF0aGNhbCBGX3AiXSxbMSwxLCJcXHByb2Rfe3BcXGluIFV9XFxtYXRoY2FsIEdfcCJdLFswLDFdLFswLDJdLFsyLDNdLFsxLDNdXQ==
Since $\prod_p \phi_p$ is an isomorphism, there exists $(s_p)\in \prod_p \mc F_p$ such that $\phi_p(s_p)=t_p$. What this means is that for every $p\in U$ there exists open sets $U_p\hookrightarrow U$, sections $\td s_p\in \mc F(U_p), \td t_p\in \mc G(U_p)$ such that one has $\phi(\td s_p)=\td t_p$.

We now claim that $(s_p)$ are compatible germs, hence coming from a section $s\in \mc F(U)$ by Exercise 2.4.B, and it follows that $\phi(s)=t$, proving surjectivity of $\phi$, and we will be done. To see compatibility, we claim that for every $q\in U_p$ we have $(\td s_p)_q=s_q$. We argue by contradiction: Assume $q\in U_p$ but $(\td s_p)_q\neq s_q$. But on the other hand $(\td s_q)_q=s_q$. Note that $U_p\cap U_q\neq \emptyset$ and $\td t_p=\td t_q=t$ on the intersection $U_p\cap U_q$. However we have $\phi_q((\td s_p)_q)\neq \phi_q((\td s_q)_q)$. This means that in any neighborhood of $q$ we have $\phi(\td s_p)\neq \phi(\td s_q)$, which means $\td t_p\neq \td t_q$ on any neighborhood of $q$, which is the desired contradiction.`
  },
  {
    id: "2-2-4-f-sheafification-is-unique",
    chapter: "2",
    problem: "2.4.F",
    author: "Tianyi",
    title: "Sheafification is Unique",
    updated: "2026-09-13",
    body: String.raw`Suppose $\op{sh}':\mc F\to \mc F^{\op{sh'}}$ is another sheafification, then universal property gives two morphisms $\alpha,\beta$ between two sheafifications:
https://q.uiver.app/#q=WzAsMyxbMCwwLCJcXG1hdGhjYWwgRiJdLFsxLDAsIlxcbWF0aGNhbCBGXntcXG9wZXJhdG9ybmFtZXtzaH19Il0sWzAsMSwiXFxtYXRoY2FsIEZee1xcb3BlcmF0b3JuYW1le3NoJ319Il0sWzAsMl0sWzAsMV0sWzEsMiwiXFxiZXRhIiwwLHsib2Zmc2V0IjotMSwic3R5bGUiOnsiYm9keSI6eyJuYW1lIjoiZGFzaGVkIn19fV0sWzIsMSwiXFxhbHBoYSIsMCx7Im9mZnNldCI6LTEsInN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dXQ==
We claim $\alpha\beta=\id_{\mc F^{\op{sh}}}$. Indeed, commutativity of the diagram implies $\alpha\circ \op{sh'}=\op{sh}$. Hence we have the below diagram
https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG1hdGhjYWwgRiJdLFsyLDAsIlxcbWF0aGNhbCBGXntcXG9wZXJhdG9ybmFtZXtzaH19Il0sWzEsMSwiXFxtYXRoY2FsIEZee1xcb3BlcmF0b3JuYW1le3NoJ319Il0sWzEsMiwiXFxtYXRoY2FsIEZee1xcb3BlcmF0b3JuYW1le3NofX0iXSxbMCwyLCJcXG9wZXJhdG9ybmFtZXtzaCd9IiwyXSxbMCwxLCJcXG9wZXJhdG9ybmFtZXtzaH0iXSxbMSwyLCJcXGJldGEiXSxbMiwzLCJcXGFscGhhIl0sWzAsMywiXFxvcGVyYXRvcm5hbWV7c2h9IiwyLHsiY3VydmUiOjJ9XSxbMSwzLCJcXG9wZXJhdG9ybmFtZXtpZH0iLDAseyJjdXJ2ZSI6LTJ9XV0=
and the claim follows from uniqueness of the factorization. Similarly one can show $\beta\alpha=\id_{\mc F^{\op{sh'}}}$ as well. If $\mc F$ is a sheaf, then $\id: \mc F\to \mc F$ itself satisfies the said universal property of sheafification, hence $\mc F^{\op{sh}}=\mc F$ follows from uniqueness shown above. `
  },
  {
    id: "2-2-4-g-sheafification-is-a-functor",
    chapter: "2",
    problem: "2.4.G",
    author: "Tianyi",
    title: "Sheafification is a Functor",
    updated: "2026-09-13",
    body: String.raw`Let $\phi: \mc F\to \mc G$ be a map of presheaves. Then composition with sheafification gives a map $\mc F\to \mc G\to \mc G^{\op{sh}}.$ Now by the universal property of sheafification $\mc F^{\op{sh}}$ we get a map $\phi^{\op{sh}}:\mc F^{\op {sh}}\to \mc G^{\op{sh}}$.
We note that this is functorial: If we have $\psi: \mc G\to \mc H$, then we have the following commutative diagram (in the category of presheaves):
https://q.uiver.app/#q=WzAsNixbMCwwLCJcXG1hdGhjYWwgRiJdLFswLDEsIlxcbWF0aGNhbCBHIl0sWzAsMiwiXFxtYXRoY2FsIEgiXSxbMSwwLCJcXG1hdGhjYWwgRl57XFxvcGVyYXRvcm5hbWV7c2h9fSJdLFsxLDEsIlxcbWF0aGNhbCBHXntcXG9wZXJhdG9ybmFtZXtzaH19Il0sWzEsMiwiXFxtYXRoY2FsIEhee1xcb3BlcmF0b3JuYW1le3NofX0iXSxbMCwzXSxbMSw0XSxbMiw1XSxbMCwxLCJcXHBoaSJdLFsxLDIsIlxccHNpIl0sWzMsNCwiXFxwaGkgXntcXG9wZXJhdG9ybmFtZXtzaH19IiwyXSxbNCw1LCJcXHBzaSBee1xcb3BlcmF0b3JuYW1le3NofX0iLDJdLFswLDIsIlxccHNpXFxwaGkiLDIseyJjdXJ2ZSI6Mn1dLFszLDUsIlxccHNpIF57XFxvcGVyYXRvcm5hbWV7c2h9fSBcXHBoaV57XFxvcGVyYXRvcm5hbWV7c2h9fSIsMCx7ImN1cnZlIjotMn1dXQ==
Hence we see by uniqueness that $(\psi\phi)^{\op{sh}}=\psi^{\op{sh}}\phi^{\op{sh}}$.`
  },
  {
    id: "2-2-4-h-sheafification-is-a-sheaf",
    chapter: "2",
    problem: "2.4.H",
    author: "Tianyi",
    title: "Sheafification is a Sheaf",
    updated: "2026-09-14",
    body: String.raw`Given the definition of $\mc F^{\op{sh}}$ with the tautological restriction map, it is easy to see that $\mc F^{\op{sh}}$ is a presheaf. Now let $U\hookrightarrow X$ be an open set and $U=\cup_{i\in I}U_i$ an open cover. To see the identity axiom: If $(f_p)_{p\in U_i}=(g_p)_{p\in U_i}$ for every $i\in I$, of course $(f_p)_{p\in U}=(g_p)_{p\in U}$. To see the gluability axiom: Suppose we have $(f^i_p)_{p\in U_i}$ for every $i\in I$ such that $f^i_p=f^j_p$ for all $p\in U_i\cap U_j$, then clearly these glue to a global $(f_p)_{p\in U}$ that restricts to $(f^i_p)_{p\in U_i}$ on each $U_i$ and this is in fact a compatible germ by construction, since its restriction to each element of the open cover is.`
  },
  {
    id: "2-2-4-i-natural-map-to-sheafification",
    chapter: "2",
    problem: "2.4.I",
    author: "Tianyi",
    title: "Natural Map to Sheafification",
    updated: "2026-09-14",
    body: String.raw`There is a natural map $\op{sh}:\mc F\to \mc F^{\op{sh}}$ of presheaves: For every $U\hookrightarrow X$ open, define $\op{sh}(U): s\mapsto (s_p)_{p\in U}$ for $s\in \mc F(U)$.`
  },
  {
    id: "2-2-4-j-sheafification-satiesfies-universal-prop",
    chapter: "2",
    problem: "2.4.J",
    author: "Tianyi",
    title: "Sheafification Satiesfies Universal Property",
    updated: "2026-09-14",
    body: String.raw`Let $\phi: \mc F\to \mc G$ be a morphism from a presheaf to a sheaf. Let $U\hookrightarrow X$ be an open set with $s\in \mc F(U)$. We define $\phi^{\op{sh}}(U): \mc F^{\op{sh}}(U)\to \mc G(U)$ as follows: Let $(s_p)_{p\in U}=\op{sh}(s)\in \mc F^{\op{sh}}(U)$. Then $(t_p)_{p\in U}:=(\phi_p(s_p))_{p\in U}\in \prod_{p\in U}\mc G_p$ is a compatible germ: Indeed, for every $p\in U$ there exists $U_p$ and section $\td s_p\in \mc F(U_p)$ such that $(\td s_p)_q=s_q$ for all $q\in U_p$. Hence by possibly shrinking $U_p$, we see that $\td t_p:=\phi(U_p)(\td s_p)$ is a lift of $(t_p)_{p\in U}\in \prod_{p\in U}\mc G_p$. Thus by Exercise 2.4.B, there is a section $t\in \mc G(U)$ whose image under $\mc G(U)\to \prod_{p\in U}\mc G_p$ is precisely $(t_p)_{p\in U}$. Then the unique sheafified map is $\phi^{\op{sh}}(U):s\mapsto t.$`
  },
  {
    id: "2-2-4-k-sheafification-is-left-adjoint-to-forget",
    chapter: "2",
    problem: "2.4.K",
    author: "Tianyi",
    title: "Sheafification is Left Adjoint to Forgetful",
    updated: "2026-09-14",
    body: String.raw`We want to prove there is a correspondence $$\op{Mor}_{\op{PSh}}(\mc F,\mc G^{o})\xrightarrow{\sim}\op{Mor}_{\op{Sh}}(\mc F^{\op{sh}},\mc G)$$
where $\mc G^o$ simply denote the presheaf $\mc G$ when we forget the sheaf structure. Indeed, this bijection is simply $\phi\mapsto \phi^{\op{sh}}$. Naturality of this correspondence is simply the functoriality of sheafification, namely $(\phi\psi)^{\op{sh}}=\phi^{\op{sh}}\psi^{\op{sh}}.$`
  },
  {
    id: "2-2-4-o-mc-o-x-is-a-quotient-sheaf",
    chapter: "2",
    problem: "2.4.O",
    author: "Tianyi",
    title: "$\\mc O_X^*$ is a Quotient Sheaf",
    updated: "2026-09-15",
    body: String.raw`By definition given before to show $\mc O_X^*$ is a quotient sheaf of $\mc O_X$ we only need to show $\exp:\mc O_X\to \mc O_X^*$ is surjective on stalks. Indeed, since $X=\C$, any nonvanishing holomorphic function $f\in \mc O_X^*(U)$ defined over any contractible neighborhood $U$ admits a holomorphic logarithm $\log f\in \mc O_X(U)$, and $\exp\log f=f.$ Hence $\exp:\mc O_X\to \mc O_X^*$ is surjective on stalks.`
  },
  {
    id: "2-2-6-k-tensor-products-of-mc-o-x-modules",
    chapter: "2",
    problem: "2.6.K",
    author: "Tianyi",
    title: "Tensor Products of $\\mc O_X$-modules",
    updated: "2026-09-15",
    body: String.raw`(a) Let $\mc F, \mc G$ be two sheaves of $\mc O_X$-modules. Then one can define the product sheaf by $\mc F\times \mc G: U\mapsto \mc F(U)\times \mc G(U)$ and it is not hard to check that this is a sheaf. Given another sheaf of $\mc O_X$-module $\mc H$, we can also define a bilinear morphism $\phi: \mc F\times \mc G\to \mc H$ by defining to be a $\mc O_X(U)$-bilinear map on every section $\mc F(U)\times \mc G(U)\to \mc H(U)$ for every $U\subset X$ open.

    Then the tensor product sheaf $\mc F\ot \mc G$ is a morphism $\mc F\times \mc G\to \mc F\ot \mc G$ with the following universal property: For every bilinear map of sheaves $\phi:\mc F\times \mc G\to \mc H$,  it uniquely factors through the tensor product: Namely the following diagram commutes:
    % https://q.uiver.app/#q=WzAsMyxbMCwwLCJcXG1hdGhjYWwgRlxcdGltZXMgXFxtYXRoY2FsIEciXSxbMSwwLCJcXG1hdGhjYWwgRlxcb3RpbWVzIFxcbWF0aGNhbCBHIl0sWzAsMSwiXFxtYXRoY2FsIEgiXSxbMCwyLCJcXHBoaSIsMl0sWzAsMV0sWzEsMiwiXFxleGlzdHMhXFxwc2kiLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XV0=
    \[\begin{tikzcd}[cramped]
    	{\mathcal F\times \mathcal G} & {\mathcal F\otimes \mathcal G} \\
    	{\mathcal H}
    	\arrow[from=1-1, to=1-2]
    	\arrow["\phi"', from=1-1, to=2-1]
    	\arrow["{\exists!\psi}", dashed, from=1-2, to=2-1]
    \end{tikzcd}\]

Now we give an explicit construction. Given two sheaves $\mc F,\mc G$ of $\mc O_X$-modules, we first define the presheaf
    \[
    \mc F\ot^{\operatorname{pre}}\mc G: U\mapsto \mc F(U)\ot_{\mc O_X(U)}\mc G(U)
    \]
    for every $U\subset X$ open. We define the tensor product to be the sheafification
    \[
    \mc F\ot \mc G:=(\mc F\ot^{\operatorname{pre}}\mc G)^{\operatorname{sh}}.
    \]
    Now it remains to check this construction satisfies the above universal property. First, we note that the presheaf $\mc F\ot^{\operatorname{pre}}\mc G$ satisfies the universal property in the category of presheaves, which follows immediately from the universal property of tensor product of $\mc O_X(U)$-modules for every $U\subset X$ open. Then universal property of sheafification gives the desired commutative diagram:
    % https://q.uiver.app/#q=WzAsNCxbMCwwLCJcXG1hdGhjYWwgRlxcdGltZXMgXFxtYXRoY2FsIEciXSxbMCwxLCJcXG1hdGhjYWwgSCJdLFsxLDAsIlxcbWF0aGNhbCBGXFxvdGltZXNee1xcb3BlcmF0b3JuYW1le3ByZX19XFxtYXRoY2FsIEciXSxbMiwwLCJcXG1hdGhjYWwgRlxcb3RpbWVzIFxcbWF0aGNhbCBHIl0sWzAsMSwiXFxwaGkiLDJdLFswLDJdLFsyLDEsIlxcZXhpc3RzIVxcUGhpIiwyLHsic3R5bGUiOnsiYm9keSI6eyJuYW1lIjoiZGFzaGVkIn19fV0sWzIsMywiXFxvcGVyYXRvcm5hbWV7c2h9Il0sWzMsMSwiXFxleGlzdHMhXFxwc2kiLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XV0=
    \[\begin{tikzcd}[cramped]
    	{\mathcal F\times \mathcal G} & {\mathcal F\otimes^{\operatorname{pre}}\mathcal G} & {\mathcal F\otimes \mathcal G} \\
    	{\mathcal H}
    	\arrow[from=1-1, to=1-2]
    	\arrow["\phi"', from=1-1, to=2-1]
    	\arrow["{\operatorname{sh}}", from=1-2, to=1-3]
    	\arrow["{\exists!\Phi}"', dashed, from=1-2, to=2-1]
    	\arrow["{\exists!\psi}", dashed, from=1-3, to=2-1]
    \end{tikzcd}\]

(b) Since sheafification preserves stalks (Exercise 2.4.L), it suffices to prove the claim for presheaf, i.e., it suffices to prove
    \[
    (\mc F\ot^{\operatorname{pre}}\mc G)_p=\mc F_p\ot_{\mc O_{X,p}}\mc G_p.
    \]
    To see this, we use the definition:
    \begin{align*}
        (\mc F\ot^{\operatorname{pre}}\mc G)_p:=\operatorname{colim}_{p\in U} \mc F(U)\ot_{\mc O_X(U)}\mc G(U)=\coprod_{p\in U}\mc F(U)\ot_{\mc O_X(U)}\mc G(U)/\sim
    \end{align*}
    where $[f\ot g,U]\sim [f'\ot g',V]$ iff there exists $W\subset U\cap V$ such that $f\ot g|_W=f'\ot g'|_W$. We show that this is the tensor product of stalks by proving the universal property: Suppose we have a $\mc O_{X,p}$-bilinear map $\phi:\mc F_p\times \mc G_p\to \mc H$, where $\mc H$ is any $\mc O_{X,p}$-module. Then there is a natural map
    \[
    \mc F_p\times \mc G_p\to (\mc F\ot^{\operatorname{pre}}\mc G)_p\qquad ([f,U],[g,V])\mapsto [f|_{U\cap V}\ot g|_{U\cap V},U\cap V].
    \]
    It is not hard to check this does not depend on the choice of representatives in $\mc F_p,\mc G_p$. Now we construct $\psi: (\mc F\ot^{\operatorname{pre}}\mc G)_p\to \mc H$ as follows: For pure tensors $[f\ot g,U]$, define $\psi([f\ot g,U])=\phi([f,U],[g,U])$. One can check that $\psi$ is well-defined, makes the universal diagram commute, and is uniquely determined by $\phi$. Hence by the universal property of tensor product, we conclude that $(\mc F\ot^{\operatorname{pre}}\mc G)_p=\mc F_p\ot_{\mc O_{X,p}}\mc G_p.$ This concludes the proof.


$\textbf{Remark. }$ Sheafification in tensor product definition is necessary. Otherwise tensor product of sheaves may not be a sheaf. A concrete counterexample follows from uniqueness of sheafification, and a little bit of complex geometry. Consider $\P^1$ with homogeneous coordinates $x,y$. Let $\mc O$ be the sheaf of holomorphic functions over $\P^1$. Then $\Gamma(\P^1,\mc O)=\C$ by Liouville's theorem. The line bundle $\mc O(1)$ is the tautological line bundle on $\P^1$. Let $\mc O(1)\ot \mc O(1)$ be the sheafified tensor sheaf. We know from complex geometry this is the definition of $\mc O(2)$.
Now
\[
\Gamma(\P^1,\mc O(2))=\C[x,y]_2=\C\bk{x^2,xy,y^2}
\]
which is 3-dimensional over $\C=\Gamma(\P^1,\mc O)$, while
\[
\Gamma(\P^1,\mc O(1)\ot^{\operatorname{pre}}\mc O(1))=\C[x,y]_1\ot_{\C}\C[x,y]_1=\C\bk{x,y}\ot_{\C}\C\bk{x,y}
\]
which is 4-dimensional over $\C=\Gamma(\P^1,\mc O)$. Hence we have a dimensional mismatch if we do not sheafify the tensor.`
  },
  {
    id: "2-2-7-b-pi-1-pi-are-adjoint",
    chapter: "2",
    problem: "2.7.B",
    author: "Tianyi",
    title: "$\\pi^{-1},\\pi_*$ are Adjoint",
    updated: "2026-09-17",
    body: String.raw`Let $\pi:X\to Y$ be a continuous map and $\mc F$ a sheaf on $X$, $\mc G$ a sheaf on $Y$. We will show there exists a bijection
\[
\Hom_X(\pi^{-1}\mc G,\mc F)\xrightarrow{\sim}\Hom_Y(\mc G,\pi_*\mc F).
\]
As the hint suggests, we show that both sides agree with the construction of $\Hom_{YX}(\mc G,\mc F)$. 

First let us look at the LHS: A morphism $\phi: \pi^{-1}\mc G\to \mc F$ is the data $\phi_U: \op{colim}_{V\supset \pi(U)}\mc G(V)\to \mc F(U)$ for all open $U\subset X$. With this data, for any open $V\subset X$ containing $U$ and for any $U$, we get natural maps
\[
\phi_{VU}:\mc G(V)\to \op{colim}_{V\supset \pi(U)}\mc G(V)\xrightarrow{\phi_U}\mc F(U)
\]
where the first map is the quotient map. Conversely, suppose we have maps $\phi_{VU}:\mc G(V)\to \mc F(U)$ for all $V\supset \pi(U)$ and for a fixed $U$, the universal property gives a map $\phi_U: \op{colim}_{V\supset \pi(U)}\mc G(V)\to \mc F(U).$ It is easy to check these are inverses, hence $\Hom_{X}(\pi^{-1}\mc G,\mc F)\simeq \Hom_{YX}(\mc G,\mc F)$.

Now the RHS: A morphism $\psi: \mc G\to \pi_*\mc F$ is the data $\psi_{U'}:\mc G(U')\to \mc F(\pi^{-1}U')$ for every open $U'\subset Y$. From here suppose we have open $V\supset \pi(U)$, then clearly $U\subset \pi^{-1}(V)$. Hence we get maps
\[
\phi_{VU}: \mc G(V)\xrightarrow{\psi_V}\mc F(\pi^{-1}V)\xrightarrow{\op{res}}\mc F(U).
\]
Conversely, given $\phi_{VU}$'s then $\psi_{U'}=\phi_{U',\pi^{-1}(U')}$. It is easy to check these are bijections, so we have $\Hom_Y(\mc G,\pi_*\mc F)\simeq \Hom_{YX}(\mc G,\mc F)$.

It is not hard to see that the correspondence is functorial (omitted).`
  },
  {
    id: "2-2-5-a-recover-a-sheaf-from-sheaf-of-base",
    chapter: "2",
    problem: "2.5.A",
    author: "Tianyi",
    title: "Recover a Sheaf from Sheaf of Base",
    updated: "2026-09-18",
    body: String.raw`Suppose we know $\mc F(B_i)$ for every base $B_i\in \mc B$ and restrictions $\rho_{ij}:\mc F(B_i)\to \mc F(B_j)$ for every $B_j\hookrightarrow B_i$ inclusion of elements in $\mc B$. This also means we know all stalks $\mc F_p$ for $p\in X$. To recover $\mc F$, we can identify $\mc F$ with its sheafification. Therefore, we motivated to make the following definition: A germ $(f_p)\in \prod_{p\in U}\mc F_p$ satisfies property $(\dagger)$ if for all $p\in U$, there exist a basis element $B_p\in \mc B$ containing $p$, and a section $s\in \mc F(B_p)$ such that $s_q=f_q$ for all $q\in B_p$. We then define
\[
\mc F(U):=\{(f_p)\in \prod_{p\in U}\mc F_p: (f_p) \text{ satisfies property }(\dagger)\}.
\]
The restriction map is the usual restriction of germs. This recovers the sheaf $\mc F$ completely.`
  },
  {
    id: "2-2-5-b-sheaf-of-base-is-isomorphic-to-original-",
    chapter: "2",
    problem: "2.5.B",
    author: "Tianyi",
    title: "Sheaf of Base is Isomorphic to Original Sheaf on Base",
    updated: "2026-09-18",
    body: String.raw`Let $\mc F$ be defined via its sheaf of base $F$ as in Vakil, which says $\mc F(U)$ is the germs over $U$ satisfying property $(\dagger)$ in the previous problem. We show that for any base element $B\in \mc B$ we have an isomorphism $F(B)\to \mc F(B)$. The map is given by $s\mapsto (s_p)_{p\in B}$.

Clearly this map is injective, for if $(s_p)=(t_p)$ for two sections $s,t\in F(B)$, then for all $p\in B$ there exists a base $B_p\subset B$ containing $p$ with $s|_{B_p}=t|_{B_p}$. Since $B=\cup_{p\in B}B_p$, using identity axiom of $F$ gives $s=t$ in $F(B)$. 

Now we show this map is surjective. Let $(f_p)\in \prod_{p\in B}F_p$ such that it satisfies $(\dagger)$. Let $s_p\in F(B_p)$ be local lifts of this germ. Then I claim that $s_p\in F(B_p)$ and $s_q\in F(B_q)$ agrees on any basic open set contained in $B_p\cap B_q$, for all $p,q\in B$ with $B_p\cap B_q\neq\emptyset$. Indeed, suppose not: Say $B^*\subset B_p\cap B_q$ is a basic open set with $s_p|_{B^*}\neq s_q|_{B^*}$. Then for every $x\in B^*$, by definition $(s_p)_x=(s_q)_x=f_x\in F_x$. So there exists basic open $B_x^*\in \mc B$ such that $s_p|_{B_x^*}=s_q|_{B_x^*}$. Now $B^*=\cup_{x\in B^*}B_x^*$. Hence by identity axiom $s_p|_{B^*}=s_q|_{B^*}$, which is the desired contradiction.

Hence we have established that the sections $\{s_p\in F(B_p): p\in B\}$ agrees on overlaps. Since $B=\cup_{p\in B}B_p$, gluability axiom of $F$ implies they glue to a section $s\in F(B)$ mapping to $(f_p)\in \mc F(B)$, proving surjectivity.`
  },
  {
    id: "2-2-5-c-morphism-of-sheaves-corresponds-to-morph",
    chapter: "2",
    problem: "2.5.C",
    author: "Tianyi",
    title: "Morphism of Sheaves Corresponds to Morphisms of Sheaves on a Base",
    updated: "2026-09-18",
    body: String.raw`(a) Let $\phi: \mc F\to \mc G$ be a morphism of sheaf. Since we have data $\phi_i: \mc F(B_i)\to \mc G(B_i)$, we know all induced maps on stalks $\phi_p: \mc F_p\to \mc G_p$. To recover $\phi$ we again identify $\mc F$ with germs satisfying the property $(\dagger)$. Then for every open $U\subset X$ we simply define $\phi:\mc F(U)\to \mc G(U)$ via $\phi: (f_p)\mapsto (\phi_p(f_p))$. Note that since $(f_p)$ satisfies $(\dagger)$, it is not hard to see $(\phi_p(f_p))$ also satisfies $(\dagger)$, hence indeed lands in $\mc G(U)$.

(b) Suppose we have morphism of base $\phi: F\to G.$ Again we define $\phi_U: \mc F(U)\to \mc G(U)$ by identifying sheaves of sections over $U$ as germs over $U$ satisfying $(\dagger)$, and define $\phi_U: (f_p)\mapsto (\phi_p(f_p))$.`
  }
];
