---
title: "Reflect with us - Week 3 :: IITM Online Degree"
---

# Reflect with us - Week 3 :: IITM Online Degree

Reflect with us - Week 3

# Reflect with us - Week 3

This assignment will not be graded and is only for practice.

JavaScript should be enabled to grade this question.

_1 point_

Choose the set of correct options.

 Any subset of any linearly independent set of vectors is linearly independent.

 Any subset of any linearly dependent set of vectors is linearly dependent.

 Any subset of any linearly dependent set of vectors is linearly independent.

Any set of $3$ vectors in $\\mathbb{R}^3$ is linearly independent.

Any set of $4$ vectors in $\\mathbb{R}^3$ is linearly dependent.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Any subset of any linearly independent set of vectors is linearly independent.

Any set of $4$ vectors in $\\mathbb{R}^3$ is linearly dependent.

  
  
            $\\textbf{Recall the definition of linearly dependent and independent:}$  
 Statement 1) Definition of linear dependence: A set of vectors $\\{ v\_1, v\_2, \\ldots v\_n \\}$ in $V$ is said to be linearly dependent if there exist scalars $a\_1, a\_2,\\ldots a\_n \\in \\mathbb{R}$, not all zero such that $a\_1v\_1+a\_2v\_2+\\ldots+a\_nv\_n = 0$.  
Statement 2) Definition of linear independence: A set of vectors $\\{ v\_1, v\_2, \\ldots v\_n \\}$ in $V$ is said to be linearly independent if $a\_1v\_1+a\_2v\_2+\\ldots+a\_nv\_n = 0$ implies that $a\_i = 0$ for $i = 1, 2, \\ldots n$.  
Statement 3) If $S$ is a set containing zero vector, then the set $S$ is a linearly dependent set.  
Statement 4) Let $S$ be a subset of a vector space $V$. If an element of $S$ is a scalar multiple of another element from the set $S$, then $S$ is a linearly dependent set.  
Statement 5) If $S$ is linearly dependent, then there exists $v\\in S$, such that $v$ can be written as a linear combination of other vectors in $S$ and vice versa.  
  
$\\textbf{Discussion on Option 1:}$ Let $S=\\{ v\_1, v\_2, \\ldots, v\_n\\}$ be a linearly independent set of vectors and let $S'$ be a subset of $S$.  
$\\textbf{Claim:}$ $S'$ is linearly independent.  

JavaScript should be enabled to grade this question.

_1 point_

**What we have to assume for** $S'$ **if we want to use the method of contradiction?**

Let us assume that $S'$ is linearly dependent.

Let us assume that $S'$ is linearly independent.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Let us assume that $S'$ is linearly dependent.

  
If $S'$ is linearly dependent, then there exists $v\\in S'$, such that $v$ can be written as a linear combination of other vectors in $S'$.  
  

JavaScript should be enabled to grade this question.

Which of the above statements we are using here?

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 5

_1 point_

  
$v\\in S'$ implies $v\\in S$, as $S'\\subseteq S$. Those vectors of whose linear combination is giving $v$ are also in $S$ due to the same argument.  

JavaScript should be enabled to grade this question.

_1 point_

Again from statement 5, can we conclude that $S$ is linearly dependent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  
  
But $S$ was given to be a linearly independent set, hence we arrive at a contradiction. So our claim is proved.  
$\\textbf{Another method:}$ Let $S'=\\{ v\_{i\_1}, v\_{i\_2}, \\ldots, v\_{i\_k} \\} \\subseteq S$. Consider the equation  
  
                                                           $a\_1 v\_{i\_1}+a\_2 v\_{i\_2}+ \\ldots+ a\_kv\_{i\_k}=0$  

JavaScript should be enabled to grade this question.

_1 point_

Can we conclude each $a\_i=0$ from here?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  
  
As all the $v\_{i\_j}$ are also in $S$, the given equation is a linear combination of vectors from $S$. Now as $S$ is linear independent, $a\_i=0$ for each $i\\in \\{ 1,2, \\ldots, k\\}$. Hence $S'$ is linearly independent.  
$\\bullet$ $\\textbf{Now try Question 7 and 8 of activity 3.3}$  
  
$\\textbf{Discussion on Option 2:}$ Let us discuss an example. Let $S=\\{(1,0,0), (0,1,0), (1,1,0)\\}$ be a subset of $\\mathbb{R}^3$.  

JavaScript should be enabled to grade this question.

_1 point_

Is $S$ linearly dependent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Feedback:

**Hint:** (1, 1, 0) = (1, 0, 0) + (0, 1, 0)

### Accepted Answers:

Yes.

  

JavaScript should be enabled to grade this question.

_1 point_

Can you find a linearly independent subset of $S$?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Feedback:

Hint: Check that any proper subset of $S$ of cardinality 1 or 2 is linearly independent subset of $S$.

### Accepted Answers:

Yes.

  
  
Consider $S'=\\{ (1,0,0), (0,1,0) \\}$.  

JavaScript should be enabled to grade this question.

_1 point_

Is $S'\\subseteq S$?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  

JavaScript should be enabled to grade this question.

_1 point_

Is $S'$ linearly independent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  
  
Hence Option 2 is not correct.  
  
$\\textbf{Discussion on Option 3:}$ Here also we construct an example. Let $S=\\{(1,0,0), (2,0,0), (3,0,0) \\}$.  

JavaScript should be enabled to grade this question.

_1 point_

Is $S$ linearly dependent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  
  
Consider $S'=\\{ (1,0,0), (2,0,0) \\}$.  

JavaScript should be enabled to grade this question.

_1 point_

Is $S'\\subseteq S$?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  

JavaScript should be enabled to grade this question.

_1 point_

Is $S'$ linearly independent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

No.

  
  
Hence Option 3 is not correct.  
  
$\\textbf{Discussion on Option 4:}$ Consider the same set $S=\\{(1,0,0), (2,0,0), (3,0,0) \\}$ that we have discussed previously.  

JavaScript should be enabled to grade this question.

_1 point_

Is $S$ linearly independent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

No.

  

JavaScript should be enabled to grade this question.

_1 point_

What can we conclude about Option 4 from this?

 Option 4 is correct.

 Option 4 is not correct.

 Nothing can be concluded about Option 4 from here.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Option 4 is not correct.

  
$\\bullet$ $\\textbf{Now try Question 5 and 8 of activity 3.4}$  
  
  
$\\textbf{Discussion on Option 5:}$ Let $S=\\{ v\_1, v\_2, v\_3, v\_4 \\}$ be a set of 4 vectors in $\\mathbb{R}^3$. Let $v\_1=(x\_1, y\_1,z\_1)$, $v\_2=(x\_2,y\_2,z\_2)$, $v\_3=(x\_3, y\_3, z\_3)$, $v\_4=(x\_4, y\_4, z\_4)$. Consider the following equation,  
  
                                             $a\_1v\_1+ a\_2v\_2+a\_3v\_3+a\_4v\_4=0$  
i.e.,  
                                               
                          $a\_1 (x\_1, y\_1,z\_1)+ a\_2 (x\_2,y\_2,z\_2)+ a\_3 (x\_3, y\_3, z\_3)+ a\_4 (x\_4, y\_4, z\_4)=(0,0,0)$  
 i.e.,  
  
                                            $\\begin{aligned} a\_1 x\_1 + a\_2 x\_2 + a\_3 x\_3 + a\_4x\_4 &= 0 \\\\ a\_1 y\_1 + a\_2 y\_2 + a\_3 y\_3 + a\_4y\_4 &= 0 \\\\ a\_1 z\_1 + a\_2 z\_2 + a\_3 z\_3 + a\_4z\_4 &= 0 \\\\ \\end{aligned}$  
  
The matrix representation of this system of linear equations is given by  
  
                    $\\begin{bmatrix} x\_1 & x\_2 & x\_3 & x\_4 \\\\ y\_1 & y\_2 & y\_3 & y\_4 \\\\ z\_1 & z\_2 & z\_3 & z\_4 \\end{bmatrix} \\begin{bmatrix} a\_1 \\\\ a\_2 \\\\ a\_3 \\\\ a\_4 \\end{bmatrix} =\\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\end{bmatrix}$  
  
We want to find the solution for the vector $\\begin{bmatrix} a\_1 \\\\ a\_2 \\\\ a\_3 \\\\ a\_4 \\end{bmatrix}$ for this given homogeneous system of linear equations.  
  

JavaScript should be enabled to grade this question.

_1 point_

What can we say about the solutions of this system of linear equations?

 The solution is unique.

 There are infinitely many solutions.

 There must exist a non-zero solution.

$0$ is the only solution.

### No, the answer is incorrect.  
Score: 0

### Feedback:

Hint: Try to compute the maximum number of dependent variables you can get from the row reduced echelon form of the above matrix.

### Accepted Answers:

There are infinitely many solutions.

There must exist a non-zero solution.

  

JavaScript should be enabled to grade this question.

_1 point_

Is $S$ linearly independent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

No.

  
  
Hence Option 5 is correct.  
$\\bullet$$\\textbf{This will help you to solve Question number 4 of the graded assignment.}$

Check Answers

Your score is: 0/16

Please enable JavaScript to continue using this application.