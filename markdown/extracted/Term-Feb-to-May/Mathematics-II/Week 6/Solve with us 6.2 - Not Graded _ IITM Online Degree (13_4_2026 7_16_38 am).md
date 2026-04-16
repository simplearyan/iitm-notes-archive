---
title: "Solve with us 6.2 - Not Graded :: IITM Online Degree"
---

# Solve with us 6.2 - Not Graded :: IITM Online Degree

Solve with us 6.2 - Not Graded

# Solve with us 6.2 - Not Graded

This assignment will not be graded and is only for practice.

$\\textbf{Key Points: 1}$   
  

*   Let $T: V\\rightarrow W$ be a linear transformation. We define kernel of $T$ (denoted by $ker(T)$) and image of $T$ (denoted by $Im(T)$) as follows:

  
                            $Ker(T)=\\lbrace v\\in V \\mid T(v)=0 \\rbrace$  
                            $Im(T)=\\lbrace w\\in W \\mid \\text{ there exists } v\\in V \\text{ for which } T(v)=w\\rbrace$  

*   $T$ is injective (i.e., $T$ is a monomorphism) if and only if $Ker(T)=\\{0\\}$. 
*    A linear transformation $T:V\\rightarrow W$ is surjective (i.e., $T$ is epimorphism) if and only if $Im(T)=W$.
*   $Nullity(T)=dim (Ker(T))$ and $Rank(T)=dim (Im(T))$.
*   Let $T: V\\rightarrow W$ be a linear transformation. Then

  
                                         $Rank(T)+Nullity (T)=dim (V).$  
          This is known as the rank nullity theorem.  
  

*   Let $T: V\\rightarrow W$ be a linear transformation. $T$ is injective if and only if $Nullity(T)=0$. $T$ is surjective if and only if $Rank(T)=dim(W)$.

JavaScript should be enabled to grade this question.

Consider the following linear transformation:  
$T:\\mathbb{R}^3 \\rightarrow \\mathbb{R}^2$  
$T(x,y,z)=(2x+3z,4y+z)$  
  
Answer the following questions:

JavaScript should be enabled to grade this question.

_1 point_

Which of the following Options is true?  
   
\[Hint: $T(x,y,z)=(2x+3z,4y+z)=(0,0)$, i.e., $2x+3z=0$ and $4y+z=0$\]

$ker(T)=\\lbrace (3y, y, -4y) \\mid y \\in \\mathbb{R} \\rbrace$

$ker(T)=\\lbrace (6y, y, 4y) \\mid y \\in \\mathbb{R} \\rbrace$

$ker(T)=\\lbrace (6y, y, -4y) \\mid y \\in \\mathbb{R} \\rbrace$

$ker(T)=\\lbrace (3y, y, 4y) \\mid y \\in \\mathbb{R} \\rbrace$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$ker(T)=\\lbrace (6y, y, -4y) \\mid y \\in \\mathbb{R} \\rbrace$

JavaScript should be enabled to grade this question.

_1 point_

Which of the following is a basis of $Ker(T)$?

$\\{ (3,1,-4) \\}$

$\\{ (6,0,-4), (0,1,-4) \\}$

$\\{(6,1,-4) \\}$

$\\{ (3,0,-2), (0,1,-4)\\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\{(6,1,-4) \\}$

JavaScript should be enabled to grade this question.

Find the nullity of $T$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 1

_1 point_

JavaScript should be enabled to grade this question.

Find the rank of $T$.  
  
\[Hint: use rank nullity theorem.\]  

### No, the answer is incorrect.  
Score: 0

### Feedback:

– Here dim(V ) = 3 as V = R3.

### Accepted Answers:

(Type: Numeric) 2

_1 point_

JavaScript should be enabled to grade this question.

_1 point_

Which of the following is true?

$T$ is both injective and surjective.

$T$ is injective but not surjective.

$T$ is surjective but not injective.

$T$ is neither injective nor surjective.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$T$ is surjective but not injective.

  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Which option represents the kernel and image of the following linear transformation?       
                             $T:\\mathbb{R}^2\\rightarrow \\mathbb{R}^2$  
                             $T(x,y)=(x,0)$

$ker(T)=Span\\lbrace (1,0) \\rbrace, Im(T)=Span \\lbrace (1,0) \\rbrace$.

$ker(T)=Span\\lbrace (1,0) \\rbrace, Im(T)=Span \\lbrace (0,1) \\rbrace$.

$ker(T)=Span\\lbrace (0,1) \\rbrace, Im(T)=Span \\lbrace (1,0) \\rbrace$.

$ker(T)=Span\\lbrace (0,1) \\rbrace, Im(T)=Span \\lbrace (0,1) \\rbrace$.

### No, the answer is incorrect.  
Score: 0

### Feedback:

• Ker(T) = {(0, y) | y ∈ R}.

### Accepted Answers:

$ker(T)=Span\\lbrace (0,1) \\rbrace, Im(T)=Span \\lbrace (1,0) \\rbrace$.

  
  
  

$\\textbf{Key Points: 2}$  

*   Let $T:V \\rightarrow W$ be a linear. Follow the steps below to find bases for the null space and the range space of $T$.

   
Step 1: Find the matrix $A$ corresponding to $T$ with respect to some standard ordered bases $\\beta = \\{v\_1, v\_2, ..., v\_n\\}$ and $\\gamma = \\{w\_1, w\_2, ..., w\_m\\}$ for $V$ and $W$ respectively.   
Step 2: Use row reduction on $A$ to obtain the matrix $R$ which is in reduced row echelon form.  
   
Step 3: The basis of the solution space of $Rx=0$ is the basis of null space of matrix $A$ and can be obtained by finding the pivot and non-pivot columns (dependent and independent variables) as seen earlier.  
   
Step 4: The vectors $\\begin{bmatrix} c\_{11}\\\\ c\_{12}\\\\ .\\\\ .\\\\ .\\\\ c\_{1n} \\end{bmatrix}, \\begin{bmatrix} c\_{21}\\\\ c\_{22}\\\\ .\\\\ .\\\\ .\\\\ c\_{2n} \\end{bmatrix}, ..., \\begin{bmatrix} c\_{k1}\\\\ c\_{k2}\\\\ .\\\\ .\\\\ .\\\\ c\_{kn} \\end{bmatrix}$ form a basis of the null space of $A$ precisely when the vectors $v\_1', v\_2', ..., v\_k' \\in \\ker(T)$ where $v\_i' = \\sum\_{j = 1}^nc\_{ij}v\_j$, form a basis for $\\ker(T)$. Use the basis obtained in step 3 to thus get a basis for $\\ker(T)$.  
   
Step 5: Recall that if $i\_1 , i\_2, \\ldots, i\_r$ are the columns of $R$ containing the pivot elements, then the same columns of $A$ form a basis for the column space of $A$.   
Step 6: The vectors $\\begin{bmatrix} d\_{11}\\\\ d\_{12}\\\\ .\\\\ .\\\\ .\\\\ d\_{1m} \\end{bmatrix}, \\begin{bmatrix} d\_{21}\\\\ d\_{22}\\\\ .\\\\ .\\\\ .\\\\ d\_{2m} \\end{bmatrix}, ..., \\begin{bmatrix} d\_{r1}\\\\ d\_{r2}\\\\ .\\\\ .\\\\ .\\\\ d\_{rm} \\end{bmatrix}$ form a basis of the column space of $A$ precisely when the vectors $w\_1', w\_2', ..., w\_r' \\in im(T)$ where $w\_i' = \\sum\_{j = 1}^md\_{ij}w\_j$, form a basis for $im(T)$. Use the basis obtained in step 5 to thus get a basis for $im(T)$.  
  

JavaScript should be enabled to grade this question.

Consider the following linear transformation:  
  
$T: \\mathbb{R}^3 \\rightarrow \\mathbb{R}^3$  
$T(x,y,z)=(x-z,2x+3y+z,3y+3z)$  
  
Answer the following questions 7-9 using the information given above.

JavaScript should be enabled to grade this question.

_1 point_

Which of the matrices corresponds the given linear transformation $T$ with respect to the standard ordered basis of $\\mathbb{R}^3$ for both the domain and the codomain?

$\\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 3 & 3 \\\\ -1 & 1 & 3 \\end{bmatrix}$

$\\begin{bmatrix} 1 & 2 & 3 \\\\ -1 & 3 & 3 \\\\ 0 & 1 & 0 \\end{bmatrix}$

$\\begin{bmatrix} 1 & -1 & 0 \\\\ 2 & 3 & 1 \\\\ 3 & 3 & 0 \\end{bmatrix}$

$\\begin{bmatrix} 1 & 0 & -1 \\\\ 2 & 3 & 1 \\\\ 0 & 3 & 3 \\end{bmatrix}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\begin{bmatrix} 1 & 0 & -1 \\\\ 2 & 3 & 1 \\\\ 0 & 3 & 3 \\end{bmatrix}$

JavaScript should be enabled to grade this question.

_1 point_

What will be the kernel of $T$?

$\\lbrace (x,0,z),(0,y,z) \\mid x,y,z \\in \\mathbb{R} \\rbrace$.

$\\lbrace (z,0, z), (0,-z,z) \\mid z\\in \\mathbb{R}\\rbrace$.

$\\lbrace (z,-z, z) \\mid z\\in \\mathbb{R}\\rbrace$.

$\\lbrace (x,0,z),(0,-x,z) \\mid x,z \\in \\mathbb{R} \\rbrace$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\lbrace (z,-z, z) \\mid z\\in \\mathbb{R}\\rbrace$.

JavaScript should be enabled to grade this question.

_1 point_

What will be the basis of the image space of $T$ found by the algorithm mentioned in the Key Points ?

$\\{(1,0,-1),(2, 3, 1) \\}$

$\\{(1,0,0),(0, 1, 0) \\}$

$\\{(1,2,0),(0, 3, 3) \\}$

$\\{(-1,1,3)\\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\{(1,2,0),(0, 3, 3) \\}$

  

  

Check Answers

Your score is: 0/9

Please enable JavaScript to continue using this application.