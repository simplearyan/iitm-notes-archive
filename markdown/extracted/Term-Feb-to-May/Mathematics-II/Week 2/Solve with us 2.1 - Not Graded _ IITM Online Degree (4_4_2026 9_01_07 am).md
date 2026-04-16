---
title: "Solve with us 2.1 - Not Graded :: IITM Online Degree"
---

# Solve with us 2.1 - Not Graded :: IITM Online Degree

Solve with us 2.1 - Not Graded

# Solve with us 2.1 - Not Graded

This assignment will not be graded and is only for practice.

**1\. Key Points:  
  
Calculating minors and cofactors of a matrix:  
**

*   If $A$ is a square matrix, then the minor of the entry in the $i$\-th row and $j$\-th column (denoted by $M\_{ij}$) is the determinant of the submatrix formed by deleting the $i$\-th row and $j$\-th column.
*   The $ij$\-th cofactor (denoted by $C\_{ij}$) is defined to be $(-1)^{i+j}M\_{ij}$.

**Calculating the determinant:  
  

*   $det(A)=\\sum\_{i=1}^n a\_{ij}(-1)^{i+j}M\_{ij}= \\sum\_{i=1}^n a\_{ij}C\_{ij}$**  Let us consider a $3\\times 3$ matrix $A$ as follows:  
   
$A= \\begin{bmatrix} a\_{11} & a\_{12} & a\_{13} \\\\ a\_{21} & a\_{22} & a\_{23} \\\\ a\_{31} & a\_{32} & a\_{33} \\end{bmatrix}$  
  
   
**Calculating $M\_{11}$ and $C\_{11}$:**  
  
• Find out the sub-matrix by deleting the first row and the first column:  
 $\\begin{bmatrix} \\bullet & \\bullet & \\bullet \\\\ \\bullet & a\_{22} & a\_{23} \\\\ \\bullet & a\_{32} & a\_{33} \\end{bmatrix}$   
  
• Calculating the determinant of the sub-matrix:  
 $det \\left( \\begin{bmatrix} a\_{22} & a\_{23} \\\\ a\_{32} & a\_{33} \\end{bmatrix} \\right ) = a\_{22}a\_{33}-a\_{32} a\_{23}$   

*     $M\_{11}= a\_{22}a\_{33}-a\_{32} a\_{23}$
*     $C\_{11}=(-1)^{1+1} (a\_{22}a\_{33}-a\_{32} a\_{23})= a\_{22}a\_{33}-a\_{32} a\_{23}$ 

**Calculating $M\_{23}$ and $C\_{23}:$  
**  
• Find out the sub-matrix by deleting the second row and the third column:  
 $\\begin{bmatrix} a\_{11} & a\_{12} & \\bullet \\\\ \\bullet & \\bullet & \\bullet \\\\ a\_{31} & a\_{32} & \\bullet \\end{bmatrix}$   
• Calculating the determinant of the sub-matrix:  
 $det \\left( \\begin{bmatrix} a\_{11} & a\_{12} \\\\ a\_{31} & a\_{32} \\end{bmatrix} \\right ) = a\_{11}a\_{32}-a\_{31} a\_{12}$   

*     $M\_{23}= a\_{11}a\_{32}-a\_{31} a\_{12}$
*     $C\_{23}=(-1)^{2+3} (a\_{11}a\_{32}-a\_{31} a\_{12})= - a\_{11}a\_{32} + a\_{31} a\_{12}$ 

**Calculating the determinant of A:  
**  

*   Expanding with respect to the first row:

  
  $det(A)= a\_{11}(-1)^{1+1}M\_{11} + a\_{12}(-1)^{1+2}M\_{12} + a\_{13}(-1)^{1+3}M\_{13}$   
  

*   Expanding with respect to the second row:

  
$det(A)= a\_{21}(-1)^{2+1}M\_{21} + a\_{22}(-1)^{2+2}M\_{22} + a\_{23}(-1)^{2+3}M\_{23}$  
  

*   Expanding with respect to the third row:

  
         $det(A)= a\_{31}(-1)^{3+1}M\_{31} + a\_{32}(-1)^{3+2}M\_{32} + a\_{33}(-1)^{3+3}M\_{33}$   
  
The determinant can also be calculated by expanding along columns.  
  

*   Expanding with respect to the first column:

$det(A)= a\_{11}(-1)^{1+1}M\_{11} + a\_{21}(-1)^{2+1}M\_{21} + a\_{31}(-1)^{3+1}M\_{31}$  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

Consider a square matrix $A = \\begin{bmatrix} -1 & 2 & 0\\\\ 2 & 0 & -1\\\\ -1 & 0 & 1 \\end{bmatrix}$. Find out $M\_{23}$.  
 \[Hint: Find out the sub-matrix by deleting the second row and the third column: $\\begin{bmatrix} -1 & 2 & \\bullet \\\\ \\bullet & \\bullet & \\bullet \\\\ -1 & 0 & \\bullet \\end{bmatrix}$ Calculate the determinant of the sub-matrix. \]

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 2

_1 point_

JavaScript should be enabled to grade this question.

Consider a square matrix $A = \\begin{bmatrix} -1 & 2 & 0\\\\ 2 & 0 & -1\\\\ -1 & 0 & 1 \\end{bmatrix}$. Find out $C\_{32}$.  
 \[Hint: Find out the sub-matrix by deleting the third row and the second column: $\\begin{bmatrix} -1 & \\bullet & 0 \\\\ 2 & \\bullet & -1 \\\\ \\bullet & \\bullet & \\bullet \\end{bmatrix}$ Calculate the determinant of the sub-matrix to find $M\_{32}$. To find the cofactor $C\_{23}$ the sign has to be taken care of as follows: $C\_{32}=(-1)^{3+2}M\_{32}$ \]

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) -1

_1 point_

JavaScript should be enabled to grade this question.

Consider a square matrix $A = \\begin{bmatrix} -1 & 2 & 0\\\\ 2 & 0 & -1\\\\ -1 & 0 & 1 \\end{bmatrix}$. Find out the determinant of $A$.  
 \[Hint: Expanding with respect to the first row:  
         $det(A)= a\_{11}(-1)^{1+1}M\_{11} + a\_{12}(-1)^{1+2}M\_{12} + a\_{13}(-1)^{1+3}M\_{13}$  
 Expanding with respect to any row will also give you the answer\]

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) -2

_1 point_

JavaScript should be enabled to grade this question.

_1 point_

Consider the following square matrices:   
 $A = \\begin{bmatrix} 2013 & 2014 & 2015\\\\ 2016 & 2017 & 2022\\\\ 2019 & 2020 & 2021 \\end{bmatrix}, B = \\begin{bmatrix} 2016 & 2017 & 2022\\\\ 2013 & 2014 & 2015\\\\ 2019 & 2020 & 2021 \\end{bmatrix} \\text{ and } C = \\begin{bmatrix} 4032 & 4034 & 4044\\\\ 2013 & 2014 & 2015\\\\ 2019 & 2020 & 2021 \\end{bmatrix}$  
 Choose the set of correct options.  
 Hint:   

*    $B$ can be obtained by interchanging the first two rows.
*    $C$ can be obtained by multiplying 2 to the first row of $B$. 

$det(B) = det(A)$.

$det(A) = - det(B)$.

$det(C) \\neq -2det(B)$.

$det(C) = - 2det(A)$

### No, the answer is incorrect.  
Score: 0

### Feedback:

• Sign of the determinant changes due to interchange of two rows.  
• If a scalar $c$ is multiplied with a row of a matrix, then the determinant of the new matrix will be $c$ times the determinant of the earlier matrix.

### Accepted Answers:

$det(A) = - det(B)$.

$det(C) \\neq -2det(B)$.

$det(C) = - 2det(A)$

  
  
  
**2\. Key Points:**  
**Cramers' Rule:** (This rule is applied to any system of linear equations with $n$ equations and $n$ variables. Here we recall the method for a system of linear equations with $3$ equations and $3$ variables.)  
  

*    Consider a system of linear equations as follows: $\\begin{aligned} a\_{11}x\_1+ a\_{12}x\_2+ a\_{13}x\_3 = b\_1\\\\ a\_{21}x\_1+ a\_{22}x\_2+ a\_{23}x\_3 = b\_2\\\\ a\_{31}x\_1+ a\_{32}x\_2+ a\_{33}x\_3 = b\_3 \\end{aligned}$ 

  

*   Let the matrix representation of the above system be $Ax=b$, where $A=\\begin{bmatrix} a\_{11} & a\_{12} & a\_{13} \\\\ a\_{21} & a\_{22} & a\_{23} \\\\ a\_{31} & a\_{32} & a\_{33} \\end{bmatrix}$, $x=\\begin{bmatrix} x\_1 \\\\ x\_2 \\\\ x\_3 \\end{bmatrix}$, and $b=\\begin{bmatrix} b\_1 \\\\ b\_2 \\\\ b\_3 \\end{bmatrix}$.

  

*   Let $A\_{x\_i}$ be the matrix obtained by replacing the $i$\-th column of $A$ $\\Bigg (i.e., \\begin{bmatrix} a\_{1i} \\\\ a\_{2i} \\\\ a\_{3i} \\end{bmatrix} \\Bigg)$ by $b$, for $i=1,2,3$.

  
$A\_{x\_1}=\\begin{bmatrix} b\_1 & a\_{12} & a\_{13} \\\\ b\_2 & a\_{22} & a\_{23} \\\\ b\_3 & a\_{32} & a\_{33} \\end{bmatrix}$  
$A\_{x\_2}=\\begin{bmatrix} a\_{11} & b\_1 & a\_{13} \\\\ a\_{21} & b\_2 & a\_{23} \\\\ a\_{31} & b\_3 & a\_{33} \\end{bmatrix}$  
$A\_{x\_3}= \\begin{bmatrix} a\_{11} & a\_{12} & b\_1 \\\\ a\_{21} & a\_{22} & b\_2 \\\\ a\_{31} & a\_{32} & b\_3 \\end{bmatrix}$  
 If $det(A) \\neq 0$, then the solutions to the above system are $\\displaystyle x\_i= \\frac{det ~A\_{x\_i}}{det~ A}$, for $i=1,2,3$. i.e., $\\displaystyle x\_1= \\frac{det ~A\_{x\_1}}{det~ A}$, $\\displaystyle x\_2= \\frac{det ~A\_{x\_2}}{det~ A}$, $\\displaystyle x\_3= \\frac{det ~A\_{x\_3}}{det~ A}$   
  
  
 Consider a system of linear equations $\\begin{aligned} x\_1+ x\_3 = 1\\\\ -x\_1+ x\_2- x\_3 = 1\\\\ -x\_2+ x\_3 = 1 \\end{aligned}$   
  
Let matrix representation of the above system be $Ax=b$, where $A = \\begin{bmatrix} 1 & 0 & 1\\\\ -1 & 1 & -1\\\\ 0 & -1 & 1 \\end{bmatrix}$, $x = \\begin{bmatrix} x\_1\\\\ x\_2\\\\ x\_3 \\end{bmatrix}$ and $b=\\begin{bmatrix} 1\\\\ 1\\\\ 1 \\end{bmatrix}$. Let $A\_{x\_i}$ be the matrix obtained by replacing the $i$\-th column of $A$ (i.e., $\\begin{bmatrix} a\_{1i} \\\\ a\_{2i} \\\\ a\_{3i} \\end{bmatrix}$) by $b$, for $i=1,2,3$.  
  
Use the above information to answer the following questions(5,6):  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Choose the set of correct options

$A\_{x\_1} = \\begin{bmatrix} 1 & 1 & 0\\\\ -1 & 1 & -1\\\\ 0 & -1 & 1 \\end{bmatrix}$

$A\_{x\_1} = \\begin{bmatrix} 1 & 0 & 1\\\\ 1 & 1 & -1\\\\ 1 & -1 & 1 \\end{bmatrix}$

$A\_{x\_2} = \\begin{bmatrix} 1 & 0 & 1\\\\ -1 & 1 & -1\\\\ 0 & -1 & 1 \\end{bmatrix}$

$A\_{x\_3} = \\begin{bmatrix} 1 & 0 & 1\\\\ -1 & 1 & 1\\\\ 0 & -1 & 1 \\end{bmatrix}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$A\_{x\_1} = \\begin{bmatrix} 1 & 0 & 1\\\\ 1 & 1 & -1\\\\ 1 & -1 & 1 \\end{bmatrix}$

$A\_{x\_3} = \\begin{bmatrix} 1 & 0 & 1\\\\ -1 & 1 & 1\\\\ 0 & -1 & 1 \\end{bmatrix}$

JavaScript should be enabled to grade this question.

_1 point_

Choose the set of correct options about the solutions to this system.

$x\_1 = −2$.

$x\_2 = −2$.

$x\_3 = 3$.

 None of the above.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$x\_1 = −2$.

$x\_3 = 3$.

  
  

  

**3\. Key Points:  
  
Calculating the inverse of a matrix A:  
**  

*   Find out the cofactor matrix $C$, whose $ij$\-th element is $C\_{ij}$: the $ij$\-th cofactor of $A$.
*   Adjoint of $A$ is transpose of $C$. 
*   Calculate the determinant of $A$ and check whether it is non-zero or not. 
*   If determinant is non-zero then the inverse of $A$ exists and is given by

   $A^{-1}=\\frac{1}{det(A)}adj(A)$.  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Which of the following is the cofactor matrix of $\\begin{bmatrix} 3 & 2 & 3 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 1 \\end{bmatrix}$?  
 \[Hint: Recall the steps to calculate the cofactors, given in Key Points 1.\]

$\\begin{bmatrix} 1 & 1 & 1 \\\\ -1 & -3 & -1\\\\ -2 & 0 & 2 \\end{bmatrix}$

$\\begin{bmatrix} - 1 & 1 & 2 \\\\ 1 & -3 & 0\\\\ 1 & 1 & -2 \\end{bmatrix}$

$\\begin{bmatrix} - 1 & 1 & 1 \\\\ 1 & -3 & 1\\\\ 2 & 0 & -2 \\end{bmatrix}$

$\\begin{bmatrix} 1 & -1 & -1 \\\\ -1 & 3 & -1\\\\ -2 & 0 & 2 \\end{bmatrix}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\begin{bmatrix} - 1 & 1 & 1 \\\\ 1 & -3 & 1\\\\ 2 & 0 & -2 \\end{bmatrix}$

JavaScript should be enabled to grade this question.

_1 point_

Which of the following is the adjoint matrix of $\\begin{bmatrix} 3 & 2 & 3 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 1 \\end{bmatrix}$?  
\[Hint: Find the transpose to the cofactor matrix.\]

$\\begin{bmatrix} 1 & -1 & -2 \\\\ 1 & -3 & 0 \\\\ 1 & - 1 & 2 \\end{bmatrix}$

$\\begin{bmatrix} - 1 & 1 & 1 \\\\ 1 & -3 & 1 \\\\ 2 & 0 & -2 \\end{bmatrix}$

$\\begin{bmatrix} -1 & 1 & 2 \\\\ 1 & -3 & 0 \\\\ 1 & 1 & -2 \\end{bmatrix}$

$\\begin{bmatrix} 1 & -1 & -2 \\\\ -1 & 3 & 0 \\\\ -1 & -1 & 2 \\end{bmatrix}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\begin{bmatrix} -1 & 1 & 2 \\\\ 1 & -3 & 0 \\\\ 1 & 1 & -2 \\end{bmatrix}$

JavaScript should be enabled to grade this question.

Find out the determinant of $\\begin{bmatrix} 3 & 2 & 3 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 1 \\end{bmatrix}$.  
\[Hint: Recall the steps to calculate the determinant, given in Key Point 1.\]

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 2

_1 point_

JavaScript should be enabled to grade this question.

_1 point_

Which of the following is the inverse matrix of $\\begin{bmatrix} 3 & 2 & 3 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 1 \\end{bmatrix}$?  
 \[Hint: If determinant is non-zero then the inverse of $A$ exists and is given by $A^{-1}=\\frac{1}{det(A)}adj(A)$.\]

$\\frac{1}{2}\\begin{bmatrix} 1 & -1 & -2 \\\\ 1 & -3 & 0 \\\\ 1 & - 1 & 2 \\end{bmatrix}$

$\\frac{1}{2}\\begin{bmatrix} - 1 & 1 & 1 \\\\ 1 & -3 & 1 \\\\ 2 & 0 & -2 \\end{bmatrix}$

$\\frac{1}{2}\\begin{bmatrix} -1 & 1 & 2 \\\\ 1 & -3 & 0 \\\\ 1 & 1 & -2 \\end{bmatrix}$

$\\frac{1}{2}\\begin{bmatrix} 1 & -1 & -2 \\\\ -1 & 3 & 0 \\\\ -1 & -1 & 2 \\end{bmatrix}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\frac{1}{2}\\begin{bmatrix} -1 & 1 & 2 \\\\ 1 & -3 & 0 \\\\ 1 & 1 & -2 \\end{bmatrix}$

JavaScript should be enabled to grade this question.

_1 point_

Choose the set of correct options.  
 Hint:   

*    $A^{-1}=\\frac{1}{det(A)}adj(A)$. 
*    $det(A^{-1})=\\frac{1}{det(A)}$

If $A=A^{-1}$, then $det (A)$ must be 1.

If $A=A^{-1}$, then $A$ must be the identity matrix.

If $A=A^{-1}$, then $A^2=I$.

If $A^{-1}=adj(A)$, then $det(A)$ must be 1.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

If $A=A^{-1}$, then $A^2=I$.

If $A^{-1}=adj(A)$, then $det(A)$ must be 1.

  

Check Answers

Your score is: 0/11

Please enable JavaScript to continue using this application.