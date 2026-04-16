---
title: "Reflect with us - Week 8 :: IITM Online Degree"
---

# Reflect with us - Week 8 :: IITM Online Degree

Reflect with us - Week 8

# Reflect with us - Week 8

This assignment will not be graded and is only for practice.

JavaScript should be enabled to grade this question.

_1 point_

Choose the set of correct options.

Suppose $\\beta = \\lbrace v\_1, v\_2, \\ldots, v\_n \\rbrace$ is an orthogonal basis of an inner product space $V$. If there exists some $v\\in V$, such that $\\langle v, v\_i \\rangle =0$ for all $i= 1,2, \\ldots, n$, then $v=0$.

There exists an orthonormal basis for $\\mathbb{R}^n$ with the standard inner product.

If $P\_W$ denotes the linear transformation which projects the vectors of an inner product space $V$ to a subspace $W$ of $V$, then $range(P\_W) \\cap null~space (P\_W)= \\lbrace 0 \\rbrace$, where $0$ denotes the zero vector of $V$.

$\\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix}$ cannot represent a matrix corresponding to some projection.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Suppose $\\beta = \\lbrace v\_1, v\_2, \\ldots, v\_n \\rbrace$ is an orthogonal basis of an inner product space $V$. If there exists some $v\\in V$, such that $\\langle v, v\_i \\rangle =0$ for all $i= 1,2, \\ldots, n$, then $v=0$.

There exists an orthonormal basis for $\\mathbb{R}^n$ with the standard inner product.

If $P\_W$ denotes the linear transformation which projects the vectors of an inner product space $V$ to a subspace $W$ of $V$, then $range(P\_W) \\cap null~space (P\_W)= \\lbrace 0 \\rbrace$, where $0$ denotes the zero vector of $V$.

$\\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix}$ cannot represent a matrix corresponding to some projection.

  
**Solution:  
**![](extracted/assets/Term-Feb-to-May_Mathematics-II_Week8_Reflectwithus-Week8_IITMOnlineDegree13_4_20267_28_06am_32.jpg)  
  
  
$\\textbf{Option 1:}$  
$\\beta = \\{v\_1, v\_2, \\ldots, v\_n\\}$ is an orthonormal basis of the inner product space $V$.  
$\\textbf{Step 1:}$ As $v\\in V$, we can express $v$ as a linear combination of the vectors $v\_1, v\_2, \\ldots, v\_n$ as follows:  
$v= \\alpha\_1v\_1+ \\ldots + \\alpha\_nv\_n$, where $\\alpha\_1, \\ldots, \\alpha\_n \\in \\mathbb{R}$  
Taking inner product of $v$ with $v\_1$, we have $\\langle v, v\_1\\rangle= \\langle \\alpha\_1v\_1+ \\ldots + \\alpha\_nv\_n, v\_1 \\rangle$  
Recall two properties of inner products on $V$:  
i) $\\langle u\_1+u\_2, u\_3 \\rangle = \\langle u\_1, u\_3 \\rangle+ \\langle u\_2, u\_3 \\rangle$ for any vectors $u\_1, u\_2, u\_3 \\in V$.  
ii) $\\langle cu\_1, u\_2 \\rangle= c \\langle u\_1, u\_2 \\rangle$ for any vectors $u\_1, u\_2 \\in V$ and $c\\in \\mathbb{R}$.  
Using these properties we have,  
$\\langle v, v\_1 \\rangle= \\alpha\_1 \\langle v\_1, v\_1 \\rangle + \\alpha\_2 \\langle v\_2, v\_1 \\rangle + \\ldots +\\alpha\_n \\langle v\_n, v\_1 \\rangle$.  
  

JavaScript should be enabled to grade this question.

What is the value of $\\langle v\_1, v\_1 \\rangle$?

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 1

_1 point_

  

JavaScript should be enabled to grade this question.

What is the value of $\\langle v\_2, v\_1 \\rangle$?

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 0

_1 point_

  

JavaScript should be enabled to grade this question.

What is the value of $\\langle v\_i, v\_1\\rangle$, for any $i\\in \\{ 2,3 \\ldots, n\\}$?

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 0

_1 point_

  
  
$\\textbf{Feedback:}$ Recall the definition of an orthonormal basis and also observe that $\\beta$ is an orthonormal basis.  
  

JavaScript should be enabled to grade this question.

If $\\langle v,v\_1\\rangle = 0$, then what is the value of $\\alpha\_1$?

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 0

_1 point_

  
$\\textbf{Feedback:}$ Observe that $\\langle v,v\_1\\rangle = \\alpha\_1$  
Similarly we can conclude that, $\\alpha\_i = 0, \\text{ for each } i= 1, 2, \\ldots, n$  
Hence, $v=0$.  
$\\textbf{Option 2:}$ Let $\\gamma = \\{v\_1, v\_2, \\ldots, v\_n\\}$ be a given ordered basis of a vector space. The steps in the process are described below to yield an orthonormal basis $\\beta =\\{u\_1, u\_2, \\ldots, u\_n\\}$.  
Step-1 $w\_1= v\_1$ , and $u\_1=\\frac{w\_1}{\\| w\_1 \\|}$.  
Step-2 $w\_2 = v\_2- \\langle v\_2, u\_1\\rangle u\_1$ and $u\_2=\\frac{w\_2}{\\| w\_2 \\|}$.  
Step-3 $w\_3 = v\_3- \\langle v\_3, u\_1\\rangle u\_1 - \\langle v\_3, u\_2\\rangle u\_2$ and $u\_3=\\frac{w\_3}{\\| w\_3 \\|}$.  
            $\\vdots$  
Step-i $w\_i = v\_i- \\sum\_{j = 1}^ {i-1} \\langle v\_i, u\_j\\rangle u\_j$ and $u\_i=\\frac{w\_i}{\\| w\_i \\|}$.  
           $\\vdots \\\\$  
Step-n $w\_n = v\_n- \\sum\_{j = 1}^{n-1} \\langle v\_n, u\_j\\rangle u\_j$ and $u\_n=\\frac{w\_n}{\\| w\_n \\|}$.  
  
Hence, Option 2 is correct.  
  
$\\textbf{Option 3:}$ $\\textbf{The projection of a vector to a subspace:}$ Let $V$ be an inner product space, $v\\in V$ and $W \\subseteq V$ be a subspace. Then the projection of $v$ onto $W$ is the vector in $W$, denoted by $P\_W(v)$, computed as follows:  
  
               $\\text{ Find an orthonormal basis } \\{v\_1, v\_2, \\ldots, v\_n\\} \\text{ for }W.$  
                             $\\text{Then } P\_W(v) = \\sum\_{i=1}^n\\langle v,v\_i \\rangle v\_i$  
$\\textbf{Step 1:}$  
  
               $\\begin{aligned} P\_W^2(v) &= P\_W(P\_W(v)) \\\\ &= P\_W( \\sum\_{i=1}^n\\langle v,v\_i \\rangle v\_i) \\\\ &= \\sum\_{i=1}^n P\_W( \\langle v, v\_i \\rangle v\_i) \\\\ &= \\sum\_{i=1}^n \\langle v, v\_i \\rangle P\_W(v\_i) \\end{aligned}$  

JavaScript should be enabled to grade this question.

_1 point_

At this point can you identify $P\_W(v\_i)$?

$v\_i$

 0

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$v\_i$

  
  
$\\textbf{Feedback:}$ As $v\_i$ is itself in $W$, the projection of it onto $W$ is nothing but the vector $v\_i$ itself. On applying the definition, we get, $P\_W(v\_i)= \\sum\_{j=1}^n\\langle v\_i,v\_j \\rangle v\_j=v\_i$ as $\\langle v\_i, v\_j\\rangle =0$ when $i\\neq j$ and $\\langle v\_i, v\_i\\rangle=1$.  
Hence we have  
  
                     $P\_W^2(v)=\\sum\_{i=1}^n \\langle v, v\_i \\rangle P\_W(v\_i)= \\sum\_{i=1}^n \\langle v, v\_i \\rangle v\_i=P\_W(v)$  
  
So we can conclude $P\_W^2=P\_W$.  
$\\textbf{Step 2:}$ Let $v \\in range (P\_W)~ \\cap~ null~ space(P\_W)$. So $v\\in range(P\_W)$ and $v \\in null~ space (P\_W)$.  
As $v\\in range(P\_W)$ there exists $v'\\in V$ such that $P\_W(v')=v$, and as $v\\in null~ space(P\_W)$, we have $P\_W(v)=0$.  
  
                        $\\begin{aligned} P\_W(v')&=v\\\\ P\_W^2(v') &= P\_W(P\_W(v')) \\\\ P\_W(v') &= P\_W(v) \[\\text{as, } P\_W^2=P\_W\] \\\\ P\_W(v') &=0 \\\\ v &=0 \\end{aligned}$  
Hence $range(P\_W) ~ \\cap ~ null~space(P\_W)=\\{0 \\}$.  
$\\textbf{Option 4:}$ If a matrix $A$ represents a projection, then $A^2$ must be $A$.  
Let $A=\\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix}$.  

JavaScript should be enabled to grade this question.

_1 point_

Is $A^2 = A$?

 Yes

 No

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

No

  
Hence, $\\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix}$ cannot represent a matrix corresponding to some projection.

Check Answers

Your score is: 0/7

Please enable JavaScript to continue using this application.