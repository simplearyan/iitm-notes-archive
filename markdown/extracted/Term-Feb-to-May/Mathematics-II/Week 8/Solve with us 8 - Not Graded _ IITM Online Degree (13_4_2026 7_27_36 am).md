# Solve with us 8 - Not Graded _ IITM Online Degree (13_4_2026 7_27_36 am)

 

$\textbf{Key Points: 1}$

- Two non-zero vectors $u$ and $v$ from an inner product space $V$ are said to be orthogonal if $\langle u,v \rangle = 0.$
- A set $S$ of non-zero vectors is said to be an orthogonal set of an inner product space if elements of the set $S$ are mutually orthogonal. i.e., $\langle v_i, v_j \rangle = 0$ for $i \neq j$, any $v_i, v_j \in S$.

- Let $\{v_1, v_2, \ldots, v_n\}$ be an orthogonal set of vectors in an inner product space. Then $\{v_1, v_2, \ldots, v_n\}$ is a linearly independent set of vectors.

- Orthogonal basis: Let $V$ be an inner product space. A basis consisting of mutually orthogonal vectors is called an orthogonal basis. In other word, a maximal orthogonal set is a basis and is called an orthogonal basis.

- An orthonormal set of vectors of an inner product space $V$ is an orthogonal set of vectors such that the norm of each vector of the set is 1.

- An orthonormal basis is an orthonormal set of vectors which form a basis.

- $\textbf{Obtaining orthonormal set from orthogonal set:}$ If $\gamma=\{v_1, v_2, \ldots, v_n\}$ is an orthogonal set of vectors then we can obtain an orthonormal set of vectors $\beta$ from $\gamma$ by dividing each vector by its norm i.e.,            

                      $\beta = \left\{\frac{v_1}{\|v_1\|}, \frac{v_2}{\|v_2\|}, \ldots, \frac{v_n}{\|v_n\|}\right\}.$

Consider a set of vectors $S = \{(1,-1,-1), (1,2,0),(-1,1,1),(-1,\frac{1}{2}, -\frac{3}{2}), (0,3,1), (2, 1, 1), (0,1,-1)\}$ from the inner product space $\mathbb{R}^3$ with usual inner product (i.e., the dot product). 
Answer questions (1) and (2).

    

 

 
 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Which of the following subsets of the set $S$ consist of mutually orthogonal vectors?
 
 
 
 
 
 
 
$\{ (1,-1,-1), (1,2,0),(-1,1,1)\}$
 
 
 
 
 
 
 
 
$\{ (1,-1,-1), (-1,\frac{1}{2}, -\frac{3}{2})\}$
 
 
 
 
 
 
 
 
$\{ (1,-1,-1), (-1,\frac{1}{2}, -\frac{3}{2}), (1, 2, 0)\}$
 
 
 
 
 
 
 
 
$S$

 
 
 
 
 
 
 
$\{(2, 1, 1), (1,-1,-1), (0,1,-1)\}$
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$\{ (1,-1,-1), (-1,\frac{1}{2}, -\frac{3}{2})\}$
 
 
 
$\{(2, 1, 1), (1,-1,-1), (0,1,-1)\}$
 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 Which of the following option(s) is (are) true?
 
 
 
 
 
 
 
$\{ (2, 1, 1), (0,1,-1)\}$ is an orthogonal basis of a vector space which is isomorphic to $\mathbb{R}^2$.
 
 
 
 
 
 
 
 
$\{ (2, 1, 1)\}$ is not an orthogonal basis of a vector space which is isomorphic to $\mathbb{R}$.
 
 
 
 
 
 
 
 
$\{ (1,-1,-1), (1,2,0) \}$ is an orthogonal basis of a vector space which is isomorphic to $\mathbb{R}^2$.
 
 
 
 
 
 
 
 
$\{(-1,1,1),(-1,\frac{1}{2}, -\frac{3}{2}), (0,3,1), \}$ is an orthogonal basis of $\mathbb{R}^3$.
 
 
 
 
 
 
 
 
$\{ \frac{(2, 1, 1)}{\sqrt{6}}, \frac{(1,-1,-1)}{\sqrt{3}}, \frac{(0,1,-1)}{\sqrt{2}}\}$ is an orthonormal basis of $\mathbb{R}^3$.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$\{ (2, 1, 1), (0,1,-1)\}$ is an orthogonal basis of a vector space which is isomorphic to $\mathbb{R}^2$.
 
 
 
$\{ \frac{(2, 1, 1)}{\sqrt{6}}, \frac{(1,-1,-1)}{\sqrt{3}}, \frac{(0,1,-1)}{\sqrt{2}}\}$ is an orthonormal basis of $\mathbb{R}^3$.
 
 
 
 
 
 

 $\textbf{Key Points: 2}$

- $\textbf{The projection of a vector to a subspace:}$
 Let $V$ be an inner product space, $v\in V$ and $W \subseteq V$ be a subspace. Then the projection of $v$ onto $W$ is the vector in $W$, denoted by $proj_W(v)$, computed as follows:
 

               $\text{ Find an orthonormal basis $\{v_1, v_2, \ldots, v_n\}$ for $W.$}$
 
                              $\text{Then $proj_W(v) = \sum_{i=1}^n\langle v,v_i \rangle v_i.$}$

 
              Remark: $proj_W(v)$ is independent of the chosen orthonormal basis.  

- Let $V$ be an inner product space and $W$ be a subspace. Then the projection of vectors in $V$ to $W$ is a linear transformation from $V$ to $V$ with image $W$.

    

 

 
 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
 Consider the vector space $\mathbb{R}^3$ with usual inner product. Which of the following vectors represents projection of the vector $u = (2,1,-2)$ onto the subspace whose an orthonormal basis is $\{(\frac{1}{\sqrt{2}}, 0, \frac{1}{\sqrt{2}}), (\frac{-2}{3}, \frac{1}{3}, \frac{2}{3})\}$?
 
 
 
 
 
 
 
$\displaystyle(\frac{14}{9}, \frac{-7}{9}, \frac{-14}{9})$
 
 
 
 
 
 
 
 (1,1,1)
 
 
 
 
 
 
 
 (2,1,-2)
 
 
 
 
 
 
 
$(\sqrt{2}, 0, \sqrt{2})$
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$\displaystyle(\frac{14}{9}, \frac{-7}{9}, \frac{-14}{9})$
 
 
 
 
 
 

    

 
 
 
 
 
 
Consider the vector space $\mathbb{R}^3$ with usual inner product. If $(a, b,c)$ is the projection vector obtained from projecting the vector $(1,0,1)$ onto the subspace $\{(x,y,z) \mid x-y+z = 0, x, y, z \in \mathbb{R}\}$, then find the value $3(a+b+c)$. 

$\textbf{Hint:}$ Find any orthonormal basis of the subspace $\{(x,y,z) \mid x-y+z = 0, x, y, z \in \mathbb{R}\}$ and use the definition of the projection of a vector onto a subspace. 
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:
(Type: Numeric) 4
 
 
 *
 
 
 1 point
 
 *
 

 
 
 

$\textbf{Key Points: 3}$

- $\textbf{Gram-schmidt process:}$ The Gram-schmidt process is used to get an orthogonal basis from any given basis of a vector space. A slight modification yields an orthonormal basis.
- Let $\gamma = \{v_1, v_2, \ldots, v_n\}$ be a given ordered basis of a vector space. The steps in the process are described below and yield an orthonormal basis $\beta =\{u_1, u_2, \ldots, u_n\}$.

  Step-1 $w_1= v_1$ , and $u_1=\frac{w_1}{\| w_1 \|}$.
 Step-2 $w_2 = v_2- \langle v_2, u_1\rangle u_1$ and $u_2=\frac{w_2}{\| w_2 \|}$.

 
 Step-3 $w_3 = v_3- \langle v_3, u_1\rangle u_1 - \langle v_3, u_2\rangle u_2$ and $u_3=\frac{w_3}{\| w_3 \|}$.
 

           $\vdots$

 Step-i $w_i = v_i- \sum_{j = 1}^ {i-1} \langle v_i, u_j\rangle u_j$ and $u_i=\frac{w_i}{\| w_i \|}$.
 

           $\vdots$

 
 Step-n $w_n = v_n- \sum_{j = 1}^{n-1} \langle v_n, u_j\rangle u_j$ and $u_n=\frac{w_n}{\| w_n \|}$.

Let $\beta$ be an ordered basis of the inner product space $\mathbb{R}^3$ with usual inner product, where $\beta = \{(1, 1, -1 ), (1, 1,0), (1,0, 0)\}$ and $\gamma = \{u_1, u_2, u_3\}$ be the corresponding orthonormal basis obtained using the Gram-schmidt process. Use this information to answer the questions (5), (6) and (7).

    

 

 
 
 
 
 
 

    

 
 
 
 
 
 
If $u_1 = (a_1, b_1, c_1 )$, then find the value of $\sqrt{3}(a_1+ b_1+ c_1).$
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:
(Type: Numeric) 1
 
 
 *
 
 
 1 point
 
 *
 

 
 

    

 
 
 
 
 
 
If $u_2 = (a_2, b_2, c_2 )$, then find the value of $\sqrt{6} (a_2+ b_2+ c_2).$
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:
(Type: Numeric) 4
 
 
 *
 
 
 1 point
 
 *
 

 
 

    

 
 
 
 
 
 
If $u_3 = (a_3, b_3, c_3 )$, then find the value of $\frac{1}{\sqrt{2}} (a_3+ b_3+ c_3).$
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:
(Type: Numeric) 0
 
 
 *
 
 
 1 point
 
 *
 

 
 
 

$\textbf{Key Points: 6}$

- $\textbf{Orthogonal transformation:}$ Let $V$ be an inner product space and $T$ be a linear transformation from $V$ to $V$. $T$ is said to be an orthogonal transformation if 

                               $\langle Tv, Tw \rangle = \langle v,w\rangle,~ \forall v,w\in V$
 

- $\textbf{Orthogonal matrix:}$ A square matrix $A$ is called an orthogonal matrix if $AA^T = A^TA = I$(identity matrix)

    

 

 
 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Consider the following linear transformations $T_1, T_2: \mathbb{R}^2 \to \mathbb{R}^2, \text{ and } T_3, T_4 : \mathbb{R}^3 \to \mathbb{R}^2$ defined as
 

                             $T_1(x, y) = (\frac{x+y}{\sqrt{2}}, \frac{x-y}{\sqrt{2}}),$
 

                           $T_2(x, y) = (x+3y, 2x-2y),$
 

                          $T_3(x, y, z) = (\frac{x+z}{\sqrt{2}} , \frac{x+y\sqrt{3}+z}{\sqrt{3}} ),$
 

                          $T_4(x, y, z) = (x+y+z, x+y),$

where $\mathbb{R}^3$ and $\mathbb{R}^2$ are the inner product spaces with respect to the dot product. Which of the linear transformation is an orthogonal transformation?
 
 
 
 
 
 
 
 
$T_1$
 
 
 
 
 
 
 
 
$T_2$
 
 
 
 
 
 
 
 
$T_3$
 
 
 
 
 
 
 
 
$T_4$
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$T_1$
 
 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 Which of the following option(s) is (are) true? 
 
 
 
 
 
 
 
 
$\begin{bmatrix} 
 1 &0\\
 0 &-1
 \end{bmatrix}$ is an orthogonal matrix.
 
 
 
 
 
 
 
 
$\frac{1}{\sqrt{2}} \begin{bmatrix} 
 1 &-1\\
 1 &1
 \end{bmatrix}$ is an orthogonal matrix.
 
 
 
 
 
 
 
 
$\begin{bmatrix} 
 1 &0 & 1\\
 2 &1 & 2\\
 -1 & -2 & 1
 \end{bmatrix}$ is an orthogonal matrix
 
 
 
 
 
 
 
 
$\frac{1}{\sqrt{2}} \begin{bmatrix} 
 1 &0 & 1\\
 0 &\sqrt{2} & 0\\
 1 & 0 & -1
 \end{bmatrix}$ is an orthogonal matrix.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$\begin{bmatrix} 
 1 &0\\
 0 &-1
 \end{bmatrix}$ is an orthogonal matrix.
 
 
 
$\frac{1}{\sqrt{2}} \begin{bmatrix} 
 1 &-1\\
 1 &1
 \end{bmatrix}$ is an orthogonal matrix.
 
 
 
$\frac{1}{\sqrt{2}} \begin{bmatrix} 
 1 &0 & 1\\
 0 &\sqrt{2} & 0\\
 1 & 0 & -1
 \end{bmatrix}$ is an orthogonal matrix.