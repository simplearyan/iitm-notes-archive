# Solve with us 2.1 - Not Graded _ IITM Online Degree (4_4_2026 9_01_07 am)

 
**1. Key Points:

Calculating minors and cofactors of a matrix:
**

- 
If $A$ is a square matrix, then the minor of the entry in the $i$-th row and $j$-th column (denoted by $M_{ij}$) is the determinant of the submatrix formed by deleting the $i$-th row and $j$-th column. 
- The $ij$-th cofactor (denoted by $C_{ij}$) is defined to be $(-1)^{i+j}M_{ij}$.

**
Calculating the determinant:

- $det(A)=\sum_{i=1}^n a_{ij}(-1)^{i+j}M_{ij}= \sum_{i=1}^n a_{ij}C_{ij}$ 

** Let us consider a $3\times 3$ matrix $A$ as follows: 
 

$A=
\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}$

 
**Calculating $M_{11}$ and $C_{11}$:**

• Find out the sub-matrix by deleting the first row and the first column:

 $\begin{bmatrix}
\bullet & \bullet & \bullet \\
\bullet & a_{22} & a_{23} \\
\bullet & a_{32} & a_{33}
\end{bmatrix}$ 

• Calculating the determinant of the sub-matrix:
 $det \left( 
 \begin{bmatrix}
 a_{22} & a_{23} \\
 a_{32} & a_{33}
 \end{bmatrix}
 \right ) = a_{22}a_{33}-a_{32} a_{23}$ 

-   $M_{11}= a_{22}a_{33}-a_{32} a_{23}$
-   $C_{11}=(-1)^{1+1} (a_{22}a_{33}-a_{32} a_{23})= a_{22}a_{33}-a_{32} a_{23}$ 

**
Calculating $M_{23}$ and $C_{23}:$

**
• Find out the sub-matrix by deleting the second row and the third column:

 $\begin{bmatrix}
a_{11} & a_{12} & \bullet \\
\bullet & \bullet & \bullet \\
a_{31} & a_{32} & \bullet
\end{bmatrix}$ 
• Calculating the determinant of the sub-matrix:

 $det \left( 
 \begin{bmatrix}
 a_{11} & a_{12} \\
 a_{31} & a_{32}
 \end{bmatrix}
 \right ) = a_{11}a_{32}-a_{31} a_{12}$ 

-   $M_{23}= a_{11}a_{32}-a_{31} a_{12}$
-   $C_{23}=(-1)^{2+3} (a_{11}a_{32}-a_{31} a_{12})= - a_{11}a_{32} + a_{31} a_{12}$ 

**
Calculating the determinant of A:

**

- Expanding with respect to the first row:

  $det(A)= a_{11}(-1)^{1+1}M_{11} + a_{12}(-1)^{1+2}M_{12} + a_{13}(-1)^{1+3}M_{13}$ 

- Expanding with respect to the second row: 
 

$det(A)= a_{21}(-1)^{2+1}M_{21} + a_{22}(-1)^{2+2}M_{22} + a_{23}(-1)^{2+3}M_{23}$

- Expanding with respect to the third row:

         $det(A)= a_{31}(-1)^{3+1}M_{31} + a_{32}(-1)^{3+2}M_{32} + a_{33}(-1)^{3+3}M_{33}$ 

The determinant can also be calculated by expanding along columns. 

- Expanding with respect to the first column: 
 

$det(A)= a_{11}(-1)^{1+1}M_{11} + a_{21}(-1)^{2+1}M_{21} + a_{31}(-1)^{3+1}M_{31}$

    

 

 
 
 
 
 
 

    

 
 
 
 
 
 
Consider a square matrix $A = \begin{bmatrix}
-1 & 2 & 0\\
2 & 0 & -1\\
-1 & 0 & 1
\end{bmatrix}$. Find out $M_{23}$.

 [Hint: Find out the sub-matrix by deleting the second row and the third column: 
 $\begin{bmatrix}
-1 & 2 & \bullet \\
\bullet & \bullet & \bullet \\
-1 & 0 & \bullet
\end{bmatrix}$
 Calculate the determinant of the sub-matrix. ]

 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:
(Type: Numeric) 2
 
 
 *
 
 
 1 point
 
 *
 

 
 

    

 
 
 
 
 
 
Consider a square matrix $A = \begin{bmatrix}
-1 & 2 & 0\\
2 & 0 & -1\\
-1 & 0 & 1
\end{bmatrix}$. Find out $C_{32}$.

 [Hint: Find out the sub-matrix by deleting the third row and the second column: 
 $\begin{bmatrix}
-1 & \bullet & 0 \\
2 & \bullet & -1 \\
\bullet & \bullet & \bullet
\end{bmatrix}$
Calculate the determinant of the sub-matrix to find $M_{32}$. To find the cofactor $C_{23}$ the sign has to be taken care of as follows: $C_{32}=(-1)^{3+2}M_{32}$ ]

 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:
(Type: Numeric) -1
 
 
 *
 
 
 1 point
 
 *
 

 
 

    

 
 
 
 
 
 
Consider a square matrix $A = \begin{bmatrix}
-1 & 2 & 0\\
2 & 0 & -1\\
-1 & 0 & 1
\end{bmatrix}$. Find out the determinant of $A$.

 [Hint: Expanding with respect to the first row:
         $det(A)= a_{11}(-1)^{1+1}M_{11} + a_{12}(-1)^{1+2}M_{12} + a_{13}(-1)^{1+3}M_{13}$
 Expanding with respect to any row will also give you the answer]

 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:
(Type: Numeric) -2
 
 
 *
 
 
 1 point
 
 *
 

 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Consider the following square matrices: 
 $A = \begin{bmatrix}
2013 & 2014 & 2015\\
2016 & 2017 & 2022\\
2019 & 2020 & 2021
\end{bmatrix}, B = \begin{bmatrix}
2016 & 2017 & 2022\\
2013 & 2014 & 2015\\
2019 & 2020 & 2021
\end{bmatrix} \text{ and } C = \begin{bmatrix}
4032 & 4034 & 4044\\
2013 & 2014 & 2015\\
2019 & 2020 & 2021
\end{bmatrix}$ 
 Choose the set of correct options.
 Hint: 

-  $B$ can be obtained by interchanging the first two rows. 
-  $C$ can be obtained by multiplying 2 to the first row of $B$. 

 
 
 
 
 
 
$det(B) = det(A)$.
 
 
 
 
 
 
 
$det(A) = - det(B)$.
 
 
 
 
 
 
 
$det(C) \neq -2det(B)$.
 
 
 
 
 
 
 
$det(C) = - 2det(A)$
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
• Sign of the determinant changes due to interchange of two rows.

• If a scalar $c$ is multiplied with a row of a matrix, then the determinant of the
new matrix will be $c$ times the determinant of the earlier matrix.
### Accepted Answers:

 
$det(A) = - det(B)$.
 
 
$det(C) \neq -2det(B)$.
 
 
$det(C) = - 2det(A)$
 
 
 
 
 
 

**2. Key Points:**
**
Cramers' Rule:
**
(This rule is applied to any system of linear equations with $n$ equations and $n$ variables. Here we recall the method for a system of linear equations with $3$ equations and $3$ variables.)

-  Consider a system of linear equations as follows: $\begin{aligned}
 a_{11}x_1+ a_{12}x_2+ a_{13}x_3 = b_1\\
 a_{21}x_1+ a_{22}x_2+ a_{23}x_3 = b_2\\
 a_{31}x_1+ a_{32}x_2+ a_{33}x_3 = b_3
\end{aligned}$ 

- Let the matrix representation of the above system be $Ax=b$, where $A=\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}$, $x=\begin{bmatrix}
x_1 \\
x_2 \\
x_3
\end{bmatrix}$, and $b=\begin{bmatrix}
b_1 \\
b_2 \\
b_3
\end{bmatrix}$. 

- Let $A_{x_i}$ be the matrix obtained by replacing the $i$-th column of $A$ $\Bigg
(i.e., \begin{bmatrix}
a_{1i} \\
a_{2i} \\
a_{3i}
\end{bmatrix} \Bigg)$ by $b$, for $i=1,2,3$. 

$A_{x_1}=\begin{bmatrix}
b_1 & a_{12} & a_{13} \\
b_2 & a_{22} & a_{23} \\
b_3 & a_{32} & a_{33}
\end{bmatrix}$

$A_{x_2}=\begin{bmatrix}
a_{11} & b_1 & a_{13} \\
a_{21} & b_2 & a_{23} \\
a_{31} & b_3 & a_{33}
\end{bmatrix}$

$A_{x_3}= \begin{bmatrix}
a_{11} & a_{12} & b_1 \\
a_{21} & a_{22} & b_2 \\
a_{31} & a_{32} & b_3
\end{bmatrix}$
 If $det(A) \neq 0$, then the solutions to the above system are
$\displaystyle x_i= \frac{det ~A_{x_i}}{det~ A}$, for $i=1,2,3$. i.e., $\displaystyle x_1= \frac{det ~A_{x_1}}{det~ A}$, $\displaystyle x_2= \frac{det ~A_{x_2}}{det~ A}$, $\displaystyle x_3= \frac{det ~A_{x_3}}{det~ A}$ 

 Consider a system of linear equations $\begin{aligned}
 x_1+ x_3 = 1\\
 -x_1+ x_2- x_3 = 1\\
 -x_2+ x_3 = 1
\end{aligned}$ 

Let matrix representation of the above system be $Ax=b$, where $A = \begin{bmatrix}
1 & 0 & 1\\
-1 & 1 & -1\\
0 & -1 & 1
\end{bmatrix}$, $x = \begin{bmatrix}
x_1\\
x_2\\
x_3
\end{bmatrix}$ and $b=\begin{bmatrix}
1\\
1\\
1
\end{bmatrix}$.
Let $A_{x_i}$ be the matrix obtained by replacing the $i$-th column of $A$ (i.e., $\begin{bmatrix}
a_{1i} \\
a_{2i} \\
a_{3i}
\end{bmatrix}$) by $b$, for $i=1,2,3$.

Use the above information to
answer the following questions(5,6):

    

 

 
 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 Choose the set of correct options
 
 
 
 
 
 
$A_{x_1} = \begin{bmatrix}
1 & 1 & 0\\
-1 & 1 & -1\\
0 & -1 & 1
\end{bmatrix}$

 
 
 
 
 
 
 
$A_{x_1} = \begin{bmatrix}
1 & 0 & 1\\
1 & 1 & -1\\
1 & -1 & 1
\end{bmatrix}$

 
 
 
 
 
 
 
$A_{x_2} = \begin{bmatrix}
1 & 0 & 1\\
-1 & 1 & -1\\
0 & -1 & 1
\end{bmatrix}$

 
 
 
 
 
 
 
$A_{x_3} = \begin{bmatrix}
1 & 0 & 1\\
-1 & 1 & 1\\
0 & -1 & 1
\end{bmatrix}$

 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$A_{x_1} = \begin{bmatrix}
1 & 0 & 1\\
1 & 1 & -1\\
1 & -1 & 1
\end{bmatrix}$

 
 
$A_{x_3} = \begin{bmatrix}
1 & 0 & 1\\
-1 & 1 & 1\\
0 & -1 & 1
\end{bmatrix}$

 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 Choose the set of correct options about the solutions to this system.
 
 
 
 
 
 
$x_1 = −2$.
 
 
 
 
 
 
 
$x_2 = −2$.
 
 
 
 
 
 
 
$x_3 = 3$.
 
 
 
 
 
 
 None of the above.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$x_1 = −2$.
 
 
$x_3 = 3$.
 
 
 
 
 
 

**
3. Key Points:

Calculating the inverse of a matrix A:
**

- Find out the cofactor matrix $C$, whose $ij$-th element is $C_{ij}$: the $ij$-th cofactor of $A$.
- Adjoint of $A$ is transpose of $C$. 
- Calculate the determinant of $A$ and check whether it is non-zero or not. 
- If determinant is non-zero then the inverse of $A$ exists and is given by

 								 $A^{-1}=\frac{1}{det(A)}adj(A)$.

    

 

 
 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Which of the following is the cofactor matrix of $\begin{bmatrix}
 3 & 2 & 3 \\
 1 & 0 & 1 \\
 2 & 1 & 1
\end{bmatrix}$?

 [Hint: Recall the steps to calculate the cofactors, given in Key Points 1.]

 
 
 
 
 
 
$\begin{bmatrix}
 1 & 1 & 1 \\
-1 & -3 & -1\\
-2 & 0 & 2 
\end{bmatrix}$

 
 
 
 
 
 
 
$\begin{bmatrix}
- 1 & 1 & 2 \\
1 & -3 & 0\\
1 & 1 & -2 
\end{bmatrix}$

 
 
 
 
 
 
 
$\begin{bmatrix}
- 1 & 1 & 1 \\
1 & -3 & 1\\
2 & 0 & -2 
\end{bmatrix}$

 
 
 
 
 
 
 
$\begin{bmatrix}
1 & -1 & -1 \\
-1 & 3 & -1\\
-2 & 0 & 2 
\end{bmatrix}$

 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$\begin{bmatrix}
- 1 & 1 & 1 \\
1 & -3 & 1\\
2 & 0 & -2 
\end{bmatrix}$

 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Which of the following is the adjoint matrix of $\begin{bmatrix}
 3 & 2 & 3 \\
 1 & 0 & 1 \\
 2 & 1 & 1
\end{bmatrix}$? 
[Hint: Find the transpose to the cofactor matrix.]

 
 
 
 
 
 
$\begin{bmatrix}
1 & -1 & -2 \\
1 & -3 & 0 \\
1 & - 1 & 2
\end{bmatrix}$

 
 
 
 
 
 
 
$\begin{bmatrix}
- 1 & 1 & 1 \\
1 & -3 & 1 \\
2 & 0 & -2
\end{bmatrix}$

 
 
 
 
 
 
 
$\begin{bmatrix}
-1 & 1 & 2 \\
1 & -3 & 0 \\
1 & 1 & -2
\end{bmatrix}$

 
 
 
 
 
 
 
$\begin{bmatrix}
1 & -1 & -2 \\
-1 & 3 & 0 \\
-1 & -1 & 2
\end{bmatrix}$

 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$\begin{bmatrix}
-1 & 1 & 2 \\
1 & -3 & 0 \\
1 & 1 & -2
\end{bmatrix}$

 
 
 
 
 

    

 
 
 
 
 
 
Find out the determinant of $\begin{bmatrix}
 3 & 2 & 3 \\
 1 & 0 & 1 \\
 2 & 1 & 1
\end{bmatrix}$.

[Hint: Recall the steps to calculate the determinant, given in Key Point 1.]

 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:
(Type: Numeric) 2
 
 
 *
 
 
 1 point
 
 *
 

 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Which of the following is the inverse matrix of $\begin{bmatrix}
 3 & 2 & 3 \\
 1 & 0 & 1 \\
 2 & 1 & 1
\end{bmatrix}$?

 [Hint: If determinant is non-zero then the inverse of $A$ exists and is given by $A^{-1}=\frac{1}{det(A)}adj(A)$.]

 
 
 
 
 
 
$\frac{1}{2}\begin{bmatrix}
1 & -1 & -2 \\
1 & -3 & 0 \\
1 & - 1 & 2
\end{bmatrix}$

 
 
 
 
 
 
 
$\frac{1}{2}\begin{bmatrix}
- 1 & 1 & 1 \\
1 & -3 & 1 \\
2 & 0 & -2
\end{bmatrix}$

 
 
 
 
 
 
 
$\frac{1}{2}\begin{bmatrix}
-1 & 1 & 2 \\
1 & -3 & 0 \\
1 & 1 & -2
\end{bmatrix}$

 
 
 
 
 
 
 
$\frac{1}{2}\begin{bmatrix}
1 & -1 & -2 \\
-1 & 3 & 0 \\
-1 & -1 & 2
\end{bmatrix}$

 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
$\frac{1}{2}\begin{bmatrix}
-1 & 1 & 2 \\
1 & -3 & 0 \\
1 & 1 & -2
\end{bmatrix}$

 
 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Choose the set of correct options.

 Hint: 

-  $A^{-1}=\frac{1}{det(A)}adj(A)$. 
-  $det(A^{-1})=\frac{1}{det(A)}$

 
 
 
 
 
 
If $A=A^{-1}$, then $det (A)$ must be 1. 
 
 
 
 
 
 
 
If $A=A^{-1}$, then $A$ must be the identity matrix. 
 
 
 
 
 
 
 
If $A=A^{-1}$, then $A^2=I$. 
 
 
 
 
 
 
 
If $A^{-1}=adj(A)$, then $det(A)$ must be 1.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
If $A=A^{-1}$, then $A^2=I$. 
 
 
If $A^{-1}=adj(A)$, then $det(A)$ must be 1.