# Solve with us 5 - Not Graded _ IITM Online Degree (13_4_2026 7_08_54 am)

 
$\textbf{1. Key points:}$

- Rank of a matrix:

              - Maximum number of linearly independent column vectors (or row vectors) in a matrix.

          NOTE: Rank of a matrix is always less than or equal to the number of columns (or rows).

- How to find rank of a matrix A:

              - Reduce the matrix to row echelon form.

              - Find the number of non zero rows in the reduced matrix which will be the rank of the matrix A.
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Consider the following two matrices:

P = $\begin{bmatrix}
 1 & 0 & 3\\
 2 & -2 & 0\\
 0 & 1 & -1\\
 0 & 2 & 1\\ 
 \end{bmatrix}$; Q = $\begin{bmatrix}
 1 & 1 & -2 & 0 \\
 1 & 0 & 2 & 0 \\
 0 & -1 & 0 & 4\\
 \end{bmatrix}$ 

Which of the following statements is (are) TRUE?
 [ Hint: Try to reduce the matrices to row echelon form and find the number of non zero rows ]
 
 
 
 
 
 
 
 Rank(P) = 4
 
 
 
 
 
 
 
 Rank(P) = Rank(Q)
 
 
 
 
 
 
 
 Rank(QP) = 4
 
 
 
 
 
 
 
 Rank(PQ) = Rank(QP)
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 Rank(P) = Rank(Q)
 
 
 Rank(PQ) = Rank(QP)
 
 
 
 

$\textbf{2 Key points:}$

- Null space of a matrix $A$:

             - Let $A$ be an $m \times n$ matrix. The subspace W = $\{ x \mid x \in \mathbb{R}^n, Ax = 0\}$ is called the null space of $A$. 
             - The dimension of the null space W is called the nullity of $A$.

- Rank-Nullity theorem:

             - Let $A$ be an $m \times n$ matrix, then rank($A$) + nullity($A$) = $n$.

Consider the following matrix:

          $A = \begin{bmatrix}
 0 & 1 & 0 \\
 0 & -1 & 0 \\
 0 & 0 & 0 \\
 \end{bmatrix}$
Use the matrix $A$ to answer the following questions (2) and (3).

    

 

 
 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 Which of the following vector space represents the null space of A?
 
 
 
 
 
 
 
 
$\{(x_1, 0, x_2) | x_1, x_2 \in \mathbb{R}\}$
 
 
 
 
 
 
 
 
$\{(0, x_1, 0) | x_1 \in \mathbb{R}\}$
 
 
 
 
 
 
 
 
$\{(x_1, x_2, 0) | x_1, x_2 \in R\}$
 
 
 
 
 
 
 
 
$\{(0, 0, x_1) | x_1 \in \mathbb{R}\}$
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$\{(x_1, 0, x_2) | x_1, x_2 \in \mathbb{R}\}$
 
 
 
 
 
 

    

 
 
 
 
 
 
What will be the rank of the matrix $A$? 
[Hint: Find the nullity of $A$ and use Rank-Nullity theorem]
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:
(Type: Numeric) 1
 
 
 *
 
 
 1 point
 
 *
 

 
 
 

$\textbf{3 Key points:}$

Linear transformation:  
A function $f$ from one vector space $V$ to another vector space $W$ ($f: V \longrightarrow W$) is said to be a linear transformation if for any two vectors $v_1$ and $v_2$ in the vector space $V$ and for any $c \in \mathbb{R}$ (scalar) the following conditions hold:
 (i) $f(v_1 + v_2) = f(v_1) + f(v_2)$

 (ii) $f(cv_1) = cf(v_1)$

    

 

 
 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
In a super market, the rates of a pen, a water bottle, a tooth brush, and a chocolate are **₹** 10, **₹** 40, **₹** 25, and **₹** 20 respectively. Suppose $T(x,y,z,w)$ denotes the total cost of $x$ pens, $y$ water bottles, $z$ tooth brushes, and $w$ chocolates. Which of the following will be the correct expression for $T(x,y,z,w)$?
 
 
 
 
 
 
$T(x,y,z,w) = x + y + z + w$
 
 
 
 
 
 
 
 
$T(x,y,z,w) = 20x + 25y + 40z + 10w$
 
 
 
 
 
 
 
 
$T(x,y,z,w) = (x + y + z + w)(10 + 40 + 25 + 20)$
 
 
 
 
 
 
 
 
$T(x,y,z,w) = 10x + 40y + 25z + 20w$
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
Check whether by evaluating for particular values of x, y, z, w the function value matches the cost.
### Accepted Answers:

 
$T(x,y,z,w) = 10x + 40y + 25z + 20w$
 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 Suppose Keerthana bought 3 pens, 5 water bottles, 10 chocolates and she did not buy any tooth brushes. Which of the following options denotes the total cost paid by her? 
 
 
 
 
 
 
 
 
$T(3,5,1,10)$
 
 
 
 
 
 
 
 
$T(3,5,0,10)$
 
 
 
 
 
 
 
 **₹**430
 
 
 
 
 
 
 
 **₹**450
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$T(3,5,0,10)$
 
 
 **₹**430