---
title: "Solve with us 4 - Not Graded :: IITM Online Degree"
---

# Solve with us 4 - Not Graded :: IITM Online Degree

Solve with us 4 - Not Graded

# Solve with us 4 - Not Graded

This assignment will not be graded and is only for practice.

$\\textbf{Key points: 1}$  

*   The span of a set $S$ (of vectors) is defined as the set of all finite linear combinations of elements (vectors) of $S$ and denoted by $Span(S)$ i.e.,  $Span(S) = \\lbrace \\sum\_{i = 1}^n a\_iv\_i \\in V \\mid a\_1,a\_2,...,a\_n \\in \\mathbb{R} \\text{ and } v\_1, v\_2,..., v\_n \\in S \\rbrace$.
*   Let $V$ be a vector space. A set $S \\subseteq V$ is spanning set for $V$ if $Span(S) = V$.
*   $\\textbf{Algorithm to obtain a spanning set for a non-zero vector space V:}$

                  i) Start with the empty set $S\_0=\\phi$.  
                  ii) Add any non-zero vector $v\_1\\in V$ to $S\_0$ and define it as $S\_1$. So $S\_1=S\_0\\cup \\{v\_1 \\}$.  
                  iii) If $Span(S\_1)= V$, then we are done. Otherwise choose $v\_2\\in V\\setminus span(S\_1)$ and add it to the set and call it $S\_2$. So $S\_2=S\_1\\cup \\{v\_2\\}$.  
                  iv) If $Span(S\_2)=V$, then we are done. Otherwise, choose $v\_3 \\in V\\setminus Span(S\_2)$, and construct $S\_3=S\_2\\cup \\{v\_3\\}$.  
                  v) Repeat the process until $Span(S\_n)=V$ for some $n$.

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Let $S = \\lbrace (1,2), (2,3) , (1, -1)\\rbrace \\subseteq$ $\\mathbb{R}^2$. Which of the following is (are) elements of $Span(S)$?

 5(1,2) + 8(1,-1)

 (0,0)

$2(1,2)-3(2,3) +5(1, -1)$

$(2,1)-2(3,2) -4(-1, 1)$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

5(1,2) + 8(1,-1)

(0,0)

$2(1,2)-3(2,3) +5(1, -1)$

$(2,1)-2(3,2) -4(-1, 1)$

JavaScript should be enabled to grade this question.

_1 point_

Let $S = \\{(1, 1, -1), (-1, 1, 1)\\} \\subset \\mathbb{R}^3$. Which of the following is (are) elements of $Span(S)$?

 2(1, 1, -1)+ (-1, 1, 1)

 (8, 8, -8)

 (0, 2,0)

 (1,1,-2)

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

2(1, 1, -1)+ (-1, 1, 1)

(8, 8, -8)

(0, 2,0)

JavaScript should be enabled to grade this question.

_1 point_

Let $S =$ {(-1, 1, 1), (0, $\\frac{1}{2}$ ,0), (0, 1, -2)}$\\subset \\mathbb{R}^3$. Which of the following option(s) is (are) true?  
  
\[$\\textbf{Hint:}$ Form the matrix using the vectors as the columns and calculate the determinant of the matrix.\]

$S$ is a linearly dependent set.

$S$ is a linearly independent set.

$S$ is a basis of the vector space $\\mathbb{R}^3$.

 None of the above.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$S$ is a linearly independent set.

$S$ is a basis of the vector space $\\mathbb{R}^3$.

JavaScript should be enabled to grade this question.

_1 point_

Consider a set of vectors $S = \\{(1, 2) ,(-1, 2), (3, 1), (-3, 1)\\}$ in $\\mathbb{R}^2$. Choose the set of correct options.

The set $\\{ (1, 2) ,(-1, 2), (3, 1)\\}$ is a basis of $\\mathbb{R}^2$.

The set $\\{ (-1, 2), (3, 1) \\}$ is a basis of $\\mathbb{R}^2$.

The set $\\{ (3, 1), (-3, 1) \\}$ is a basis of $\\mathbb{R}^2$.

 None of the above.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

The set $\\{ (-1, 2), (3, 1) \\}$ is a basis of $\\mathbb{R}^2$.

The set $\\{ (3, 1), (-3, 1) \\}$ is a basis of $\\mathbb{R}^2$.

  
  
  

$\\textbf{Key points: 2}$  
  

*   The following conditions are equivalent for a set to be a basis of a vector space:

                - Maximal linearly independent set : A linearly independent set such that if any vector is appended to it, the new set is no longer linearly independent.  
                - Minimal spanning set : A spanning set such that if any vector is removed from the set, then the set will not be a spanning set.  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Which of the following sets are maximal linearly independent sets in $\\mathbb{R}^2$?

$\\{(1,0) \\}$

$\\{(1,2), (2,4)\\}$

$\\{ (1,2), (1,1) \\}$

$\\{ (1,2), (1,1), (2,1)\\}$

$\\{ (1,0), (0,1) \\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\{ (1,2), (1,1) \\}$

$\\{ (1,0), (0,1) \\}$

JavaScript should be enabled to grade this question.

_1 point_

Which of the following sets are minimal spanning sets of $\\mathbb{R}^3$?

$\\{(1,0,0),(0,1,0)\\}$

$\\{(1,0,0), (1,1,0),(1,1,1) \\}$

$\\{(1,0,1), (0,1,1), (1,1,0) \\}$

$\\{(1,0,1),(0,1,1),(1,1,2) \\}$

$\\{(1,0,0), (0,1,0), (0,0,1),(1,1,1)\\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\{(1,0,0), (1,1,0),(1,1,1) \\}$

$\\{(1,0,1), (0,1,1), (1,1,0) \\}$

  
  
**$\\textbf{Key Points: 3}$**  

*   Basis: A basis of a vector space $V$ is a linearly independent subset of $V$ that spans $V$ .
*   Basis of a vector space:

                      - Maximal linearly independent set.  
                      - Minimal spanning set.   

  

*   How to find a basis of a subspace of $\\mathbb{R}^n$?

  
                               - Suppose a subspace $V$ of $\\mathbb{R}^n$ is defined by some constraints, as follows:  
  
                                                                  $V=\\lbrace (x\_1,x\_2,\\ldots, x\_n) \\mid f\_1(x\_1,x\_2, \\ldots, x\_n)=0, f\_2(x\_1,x\_2, \\ldots, x\_n)=0, \\ldots, \\\\f\_m(x\_1,x\_2, \\ldots, x\_n)=0 \\rbrace \\subseteq \\mathbb{R}^n$  
  
                                                 Where $f\_i$'s are linear equations in general.  
  
                               \- Step 1: By solving $f\_i$'s we have to try to find out the dependent and independent variables. Suppose there are $k$ independent variables  
                                               and there are $k-n$ dependent variables.  
  
                               \- Step 2: Choose the first independent variable, let it be $x\_1$ and assign the value 1 to that, and assign 0 to all the other independent variables.  
  
                               - Step 3: Find out the values of all the dependent variables with respect to the assignment given in Step 2 and call that vector to be $v\_1$.  
                               \- Step 4: Carry out this process for each independent variable, to get the vectors $v\_2, \\ldots , v\_k$.  
  
The set of vectors $\\lbrace v\_1, v\_2, \\ldots, v\_k \\rbrace$ is a linearly independent set and this is a maximal linearly independent set in $V$, hence forms a basis of $V$. Hence, dimension of $V$ is $k$ in this case.  

JavaScript should be enabled to grade this question.

_1 point_

Let $S =${(-1, 1, 1), (0, $\\frac{1}{2}$ ,0), (0, 1, -2)}$\\subset \\mathbb{R}^3$. Which of the following option(s) is (are) true?  
  
$\\textbf{Hint:}$ Form the matrix using the vectors as the columns and calculate the determinant of the matrix.

$S$ is a linearly dependent set.

$S$ is a linearly independent set.

$S$ is a basis of the vector space $\\mathbb{R}^3$.

 None of the above.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$S$ is a linearly independent set.

$S$ is a basis of the vector space $\\mathbb{R}^3$.

  

JavaScript should be enabled to grade this question.

_1 point_

Consider a set of vectors $S = \\{(1, 2) ,(-1, 2), (3, 1), (-3, 1)\\}$ in $\\mathbb{R}^2$. Choose the set of correct options.

The set { (1, 2) ,(-1, 2), (3, 1)} is a basis of $\\mathbb{R}^2$.

The set { (-1, 2), (3, 1) } is a basis of $\\mathbb{R}^2$.

The set { (3, 1), (-3, 1) } is a basis of $\\mathbb{R}^2$.

 None of the above.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

The set { (-1, 2), (3, 1) } is a basis of $\\mathbb{R}^2$.

The set { (3, 1), (-3, 1) } is a basis of $\\mathbb{R}^2$.

  

JavaScript should be enabled to grade this question.

_1 point_

Let $V$ be a vector space which is defined as follows: $V=\\lbrace (x,y,z) \\mid 2x+3y=0 \\text{ and } y+5z=0 \\rbrace \\subseteq \\mathbb{R}^3$ with usual addition and scalar multiplication. Which of the following sets form bases of $V$? (More than one option may be correct)  
  
\[Hint: Two constraints are given here, $f\_1(x,y,z)=2x+3y=0$ and $f\_2(x,y,z)=y+5z=0$. Observe that $z$ is the independent variable and $x$ and $y$ are the dependent variables.\]

$\\lbrace (2,3,0),(0,1,5) \\rbrace$

$\\lbrace (3,-2,0), (0, 5, -1) \\rbrace$

$\\lbrace (\\frac{15}{2}, -5, 1) \\rbrace$

$\\lbrace (15, -10, 2) \\rbrace$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\lbrace (\\frac{15}{2}, -5, 1) \\rbrace$

$\\lbrace (15, -10, 2) \\rbrace$

  

JavaScript should be enabled to grade this question.

_1 point_

Let $V$ be a vector space which is defined as follows: $V=\\lbrace (x,y,z,w) \\mid x+z=y+w \\rbrace \\subseteq \\mathbb{R}^4$ with usual addition and scalar multiplication. Which of the following set forms a basis of $V$?  
  
\[Hint: The constraint given here is $x+z=y+w$, which can be written as $x-y+z-w=0$. As there are 4 variables and 1 equation, the number of independent variables is 3, where as the number of dependent variable is 1. If you check the first vector of each option, only Option 2 and Option 4 satisfying the constraint, and in that vector $x=y=1$. Start with taking $y$ as the dependent variable, and apply the method mentioned above.\]

$\\lbrace (1,0,0,0), (0,1,0,0), (0,0,0,1) \\rbrace$.

$\\lbrace (1,1,0,0), (0,1,-1,0), (0,-1,0,1) \\rbrace$.

$\\lbrace (1,-1,0,0), (0,1,1,0), (0,-1,0,1) \\rbrace$.

$\\lbrace (1,1,0,0), (0,1,1,0), (0,-1,0,1) \\rbrace$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\lbrace (1,1,0,0), (0,1,1,0), (0,-1,0,1) \\rbrace$.

  

JavaScript should be enabled to grade this question.

Find the dimension of the vector space $V = \\{ (x,y,z,w) \\mid x+y=z+w, x+w=y+z, \\text{ and } x,y,z,w \\in \\mathbb{R}\\}$. \[Hint: Two constraints are given here $f\_1(x,y,z,w)=x+y-z-w=0$ and $f\_2(x,y,z,w)=x-y-z+w=0$. Try to find out the number of independent variables.\]

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 2

_1 point_

  
  
  
$\\textbf{Key Points: 4}$  

*   How to find a basis of a subspace $V$ of $M\_{m\\times n}(\\mathbb{R})$:

  
                \- Step 1: Consider each element of a $m\\times n$ matrix as a variable. So there are $mn$ number of variables.  
  
                \- Step 2: Using the constraints given as the definition of the subspace separate out the independent and the dependent variables. Suppose there are $k$  
                               independent variables and $mn-k$ dependent variables.  
  
                \- Step 3: Define a matrix $M\_1$ by assigning 1 to one independent variable and 0 to all the other independent variables,  
                               together with finding out the values of all the dependent variables.  
  
                \- Step 4: Repeat this process for all the independent variables to get the vectors $M\_2, M\_3, \\ldots, M\_k$.  
  
The set of matrices $\\lbrace M\_1, M\_2, \\ldots, M\_k \\rbrace$ forms a basis of $V$. Hence the dimension of $V$ is $k$ in this case.  
  

JavaScript should be enabled to grade this question.

_1 point_

Let $V=\\lbrace A \\mid A\\in M\_{3 \\times 3}(\\mathbb{R}), A \\text{ is a diagonal matrix } \\rbrace$. Which of the following sets form a basis of $V$?  
  
\[Hint: $a\_{ij} = 0$ if $i \\neq j$. Thus there are 6 constraints and these are the dependent variables while the diagonal entries are the 3 independent elements.\]

$\\left \\{ \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\right \\}$

$\\left \\{\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}, \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\right \\}$

$\\left \\{\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}, \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}, \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\right \\}$

$\\left \\{\\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}, \\begin{bmatrix} 0 & 0 & 0 \\\\ 1 & 1 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}, \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 1 & 1 & 1 \\end{bmatrix}\\right \\}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\left \\{\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}, \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}, \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\right \\}$

  

JavaScript should be enabled to grade this question.

Let $V=\\lbrace A \\mid A\\in M\_{3 \\times 3}(\\mathbb{R}), A$ is a diagonal matrix and sum of the diagonal elements are 0 $\\rbrace$. What will be the dimension of $V$?  
\[Hint: The general form a diagonal matrix of order 3 is $\\begin{bmatrix} a\_1 & 0 & 0 \\\\ 0 & a\_2 & 0 \\\\ 0 & 0 & a\_3 \\end{bmatrix}$. Hence there are three variables, $a\_1$, $a\_2$, $a\_3$. Now there is one more constraint, which says that the sum of the diagonal elements is $0$. Hence we have $a\_1+a\_2+a\_3=0$. So we can choose $a\_3$ to be the dependent variable and $a\_1$ and $a\_2$ to be the independent variables, as $a\_3=-a\_1-a\_2$.\]

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 2

_1 point_

  
  
$\\textbf{ Key points: 5}$  
  

*   Rank of a matrix:

              - Maximum number of linearly independent column vectors (or row vectors) in a matrix.  
  
          NOTE: Rank of a matrix is always less than or equal to the number of columns (or rows).  
  

*   How to find rank of a matrix A:

              - Reduce the matrix to row echelon form.  
              - Find the number of non zero rows in the reduced matrix which will be the rank of the matrix A.  
  

JavaScript should be enabled to grade this question.

_1 point_

Consider the following two matrices:  
  
P = $\\begin{bmatrix} 1 & 0 & 3\\\\ 2 & -2 & 0\\\\ 0 & 1 & -1\\\\ 0 & 2 & 1\\\\ \\end{bmatrix}$; Q = $\\begin{bmatrix} 1 & 1 & -2 & 0 \\\\ 1 & 0 & 2 & 0 \\\\ 0 & -1 & 0 & 4\\\\ \\end{bmatrix}$   
  
Which of the following statements is (are) TRUE? \[ Hint: Try to reduce the matrices to row echelon form and find the number of non zero rows \]

 Rank(P) = 4

 Rank(P) = Rank(Q)

 Rank(QP) = 4

 Rank(PQ) = Rank(QP)

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Rank(P) = Rank(Q)

Rank(PQ) = Rank(QP)

  
  

Check Answers

Your score is: 0/14

Please enable JavaScript to continue using this application.