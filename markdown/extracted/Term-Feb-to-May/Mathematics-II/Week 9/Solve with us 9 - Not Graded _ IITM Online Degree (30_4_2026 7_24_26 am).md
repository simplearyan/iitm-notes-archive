---
title: "Solve with us 9 - Not Graded :: IITM Online Degree"
---

# Solve with us 9 - Not Graded :: IITM Online Degree

Solve with us 9 - Not Graded

# Solve with us 9 - Not Graded

This assignment will not be graded and is only for practice.

$\\textbf{Key Points: 1}$  
  

*   $\\textbf{Scalar-valued multivariable functions:}$ A scalar-valued multivariable function is a function $f: D \\rightarrow \\mathbb{R}$, where $D$ is a domain in $\\mathbb{R}^n$ where $n>1$.
*   $\\textbf{Vector-valued multivariable functions:}$ A vector-valued multivariable function is a function $f: D \\rightarrow \\mathbb{R}^m$, where $D$ is a domain in $\\mathbb{R}^n$ where $n,m>1$.

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Which of the following functions are scalar-valued multivariable functions?

$f(x,y)=xy+sin (xy)$.

$f(x,y,z)= ln(x+y+z)$.

$f(x,y,z)=(x^2, z, y+xz)$.

$f(x,y)=(xy,0)$.

$f(x,y)=xy$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$f(x,y)=xy+sin (xy)$.

$f(x,y,z)= ln(x+y+z)$.

$f(x,y)=xy$.

JavaScript should be enabled to grade this question.

_1 point_

Which of the following functions are vector-valued multivariable functions?

$f(x,y)=xy+sin (xy)$.

$f(x,y,z)= ln(x+y+z)$.

$f(x,y,z)=(x^2, z, y+xz)$.

$f(x,y)=(xy,0)$.

$f(x,y)=xy$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$f(x,y,z)=(x^2, z, y+xz)$.

$f(x,y)=(xy,0)$.

  
  
  

$\\textbf{Key Points: 2}$  
  

*   $\\textbf{Composition of functions:}$ Let $D\\subseteq \\mathbb{R}^n$ and $f: D\\rightarrow \\mathbb{R}^m$ be a multivariable function. Let $g:E \\rightarrow \\mathbb{R}^p$ be a function on $E$ where $Range(f)\\subseteq E \\subseteq \\mathbb{R}^m$.

          We define a multivariable function $g\\circ f: D \\rightarrow \\mathbb{R}^p$ called the composition of $f$ and $g$ defined as $g\\circ f(\\underset{\\sim}{x})=g(f(\\underset{\\sim}{x}))$, for all $\\underset{\\sim}{x}\\in D$.  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

If two functions $f: \\mathbb{R}^2 \\rightarrow \\mathbb{R}$ and $g: \\mathbb{R} \\rightarrow \\mathbb{R}$ are defined as $f(x,y)=(x-y)$ and $g(x)=\\sin x$, then which of the following functions represents $g \\circ f$?

$\\sin x -\\sin y$.

$\\sin (x-y)$.

$x\\sin x - y \\sin y$.

$\\sin xy$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\sin (x-y)$.

JavaScript should be enabled to grade this question.

_1 point_

If two functions $f: \\mathbb{R}^2 \\rightarrow \\mathbb{R}$ and $g: \\mathbb{R} \\rightarrow \\mathbb{R}^2$ are defined as $f(x,y)=xy$ and $g(t)=(e^t, e^{-t})$, then which of the following functions represents $g \\circ f$?

$g\\circ f(x,y)=e^{xy}$.

$g\\circ f(x,y)=1$.

$g\\circ f(x,y)=(e^{xy}, e^{-xy})$.

$g\\circ f(x,y)=(e^x, e^{-x})$.

$g\\circ f(x,y)=(1,1)$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$g\\circ f(x,y)=(e^{xy}, e^{-xy})$.

  
  
  
$\\textbf{Key Points: 3}$  
  

*   $\\textbf{Partial derivatives:}$ Let $f(x\_1, x\_2, \\ldots, x\_n)$ be a function defined on a domain $D$ in $\\mathbb{R}^n$. The partial derivative of $f$ with respect to $x\_i$ is the function denoted by $f\_{x\_i}(\\underset{\\sim}{x})$ or $\\frac{\\partial f}{\\partial x\_i}(\\underset{\\sim}{x})$ and defined as

  
                                    $\\frac{\\partial f}{\\partial x\_i}(\\underset{\\sim}{x})=\\lim \\limits\_{h \\to 0 }\\frac{f(\\underset{\\sim}{x}+he\_i)-f(\\underset{\\sim}{x})}{h}$  
  
           where $e\_i$ is the unit vector $(0,0, \\ldots,0, 1, 0 , \\ldots , 0)$ (at i-th coordinate there is 1, and 0 at all the other coordinates).  
  
            $\\frac{\\partial f}{\\partial x\_i}(x\_1, x\_2, \\ldots, x\_n)=\\lim \\limits\_{h \\to 0 }\\frac{f((x\_1,x\_2, \\ldots, x\_n)+h(0,0, \\ldots, 0, 1,0, \\ldots, 0))-f(x\_1,x\_2, \\ldots, x\_n)}{h}$  
  
           $\\frac{\\partial f}{\\partial x\_i}(x\_1, x\_2, \\ldots, x\_n)=\\lim \\limits\_{h \\to 0 }\\frac{f(x\_1, x\_2, \\ldots, x\_{i-1}, x\_i+h, x\_{i+1}, \\ldots, x\_n)-f(x\_1,x\_2, \\ldots, x\_n)}{h}$  

*   To calculate the partial derivative with respect to $x\_i$, think of $f$ only as a function of $x\_i$ while treating all other variables as constants. Then calculate it as the derivative of a function of one variable.

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Consider the function $f: \\mathbb{R}^2 \\rightarrow \\mathbb{R}$ such that $f(x,y)=x^2+y^2$. Which of the following function will represent $f\_x$ or $\\frac{\\partial f}{\\partial x}$?

$2x+2y$.

$2x$.

$2x+y^2$.

$x+y^2$.

### No, the answer is incorrect.  
Score: 0

### Feedback:

Treat y as constant.

### Accepted Answers:

$2x$.

JavaScript should be enabled to grade this question.

_1 point_

Consider the function $f: D \\rightarrow \\mathbb{R}$ where $D\\subset \\mathbb{R}^2$, defined as:  
  
                           $f(x,y) = \\begin{cases} \\frac{x^2y}{x^3+y^3} & \\text{if } (x,y) \\neq (0,0)\\\\ 0 & \\text{if } (x,y)=(0,0) \\end{cases}$  
  
What will be the partial derivative of $f$ with respect to $x$ at the point $(0,0)$?

$1$.

$0$.

$2$

 Cannot be determined.

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Mathematics-II_Week9_Solvewithus9-NotGraded_IITMOnlineDegree30_4_20267_24_26am_28.jpg)

### Accepted Answers:

$0$.

  
  
  

  
  
$\\textbf{Key Points: 4}$  
  

*   $\\textbf{Directional derivative:}$ The rate of change of $f(x\_1,x\_2, \\ldots, x\_n)$ in the direction of the unit vector $u=(u\_1,u\_2, \\ldots, u\_n)$ is called the directional derivative and is denoted by $D\_uf(x\_1,x\_2, \\ldots, x\_n)$. The definition of the directional derivative is:

  
                $D\_uf(x\_1,x\_2, \\ldots, x\_n)=\\lim \\limits\_{h\\to 0} \\frac{f(x\_1+u\_1h,x\_2+u\_2h,\\ldots, x\_n+u\_nh)-f(x\_1, x\_2, \\ldots, x\_n)}{h}$  

*   To calculate the directional derivative of a function $f$ in a particular direction, we have to first find the unit vector $u$ in that direction and then compute $D\_u f$.
*   The partial derivatives are special cases of the directional derivative where $u = e\_i$ where $e\_i$is $i$\-th vector of the standard ordered basis of $\\mathbb{R}^n$.

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Consider the function $f:\\mathbb{R}^2\\rightarrow \\mathbb{R}$, such that $f(x,y)=x+y$. Which of the following options will denote the directional derivative of $f$ in the direction of the vector $v=(1,1)$?  
  
\[Hint: The given vector $v$ is not a unit vector. Convert $v$ to a unit vector $u=\\frac{v}{|| v ||}$.\]

 2

$x+y$

$\\sqrt{2}$

$\\sqrt{2}(x+y)$

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Mathematics-II_Week9_Solvewithus9-NotGraded_IITMOnlineDegree30_4_20267_24_26am_29.jpg)

### Accepted Answers:

$\\sqrt{2}$

  
  
  
  

$\\textbf{Key Points: 5}$  
  

*   $\\textbf{Limit of a scalar valued multivariable function:}$ If there exists some real number $L$ such that $f(x\_1,x\_2, \\ldots, x\_n)$ approaches $L$ as $(x\_1,x\_2, \\ldots, x\_n)$ approaches $(a\_1,a\_2, \\ldots, a\_n)$, then we write

  
                                  $\\lim \\limits\_{(x\_1,x\_2, \\ldots, x\_n)\\to (a\_1,a\_2, \\ldots, a\_n)}f(x\_1,x\_2, \\ldots, x\_n)=L$  
  

*   For functions of one variable $f(x)$, there are only two ways in which $x$ can approach a point $a$, from left or from right. But for multivariable functions, $(a\_1, a\_2 , \\ldots , a\_n)$ can be approached along any curve.
*   If $C$ is a curve passing through $(a\_1 , a\_2 , \\dots , a\_n )$ , the limit of $f$ at $(a\_1 , a\_2 , \\dots , a\_n )$ along the curve $C$ exists and equals $L$ if $f(x\_1 , x\_2 , \\ldots , x\_n)$ approaches $L$ as $(x\_1 , x\_2 , \\ldots , x\_n)$ approaches $(a\_1 , a\_2 , \\ldots , a\_n)$ where $(x\_1 , x\_2 , \\ldots , x\_n)$ belongs to $C$.
*   The limit of the function at $(a\_1 , a\_2 , \\ldots , a\_n )$ along the curve $C$ equals $L$ for each curve $C$ passing through $(a\_1 , a\_2 , \\ldots , a\_n )$ precisely when the limit of $f$ at $(a\_1 , a\_2 , \\ldots , a\_n )$ equals $L$.
*   To show that the limit of $f$ at $(a\_1 , a\_2 , \\dots , a\_n )$ does not exist, one should either produce a curve $C$ so that the limit of $f$ at $(a\_1 , a\_2 , \\dots , a\_n )$ along $C$ does not exist or produce two curves so that the limits of $f$ at $(a\_1 , a\_2 , \\dots , a\_n )$ along both curves are not equal.
*   $\\textbf{Continuity of a function:}$ If limit of a function $f:D\\rightarrow \\mathbb{R}$, where $D\\subseteq \\mathbb{R}^n$, exists at a point $(a\_1, a\_2, \\ldots, a\_n)$, and the functional value and the limiting value are the same, i.e.,

  
                              $\\lim \\limits\_{(x\_1,x\_2, \\ldots, x\_n)\\to (a\_1,a\_2, \\ldots, a\_n)}f(x\_1,x\_2, \\ldots, x\_n)=f(a\_1,a\_2, \\ldots, a\_n)$  
       then we say $f$ is continuous at the point $(a\_1, a\_2, \\ldots, a\_n)$.  
Consider the function $f: D \\rightarrow \\mathbb{R}$ where $D\\subset \\mathbb{R}^2$, defined as:  
  
                   $f(x,y) = \\begin{cases} \\frac{x^2y}{x^3+y^3} & \\text{if } (x,y) \\neq (0,0)\\\\ 0 & \\text{if } (x,y)=(0,0) \\end{cases}$  
  
Answer the following question 8 to 13 using the above information.  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

If $f$ approaches $L$ as $(x,y)$ approaches to the origin along the $X$\-axis, then find the value of $L$.

### No, the answer is incorrect.  
Score: 0

### Feedback:

Along the X-axis, y = 0.

### Accepted Answers:

(Type: Numeric) 0

_1 point_

JavaScript should be enabled to grade this question.

If $f$ approaches $L$ as $(x,y)$ approaches to the origin along the $Y$\-axis, then find the value of $L$.

### No, the answer is incorrect.  
Score: 0

### Feedback:

Along the Y -axis, x = 0.

### Accepted Answers:

(Type: Numeric) 0

_1 point_

JavaScript should be enabled to grade this question.

If $f$ approaches $L$ as $(x,y)$ approaches to the origin along the straight line $y=x$, then find the value of $L$.

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Mathematics-II_Week9_Solvewithus9-NotGraded_IITMOnlineDegree30_4_20267_24_26am_30.jpg)

### Accepted Answers:

(Type: Numeric) 0.5

_1 point_

JavaScript should be enabled to grade this question.

_1 point_

If $f$ approaches $L$ as $(x,y)$ approaches to the origin along the straight line $y=2x$, then find the value of $L$.

$0$.

$\\frac{1}{2}$.

$\\frac{2}{9}$.

$1$.

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Mathematics-II_Week9_Solvewithus9-NotGraded_IITMOnlineDegree30_4_20267_24_26am_31.jpg)

### Accepted Answers:

$\\frac{2}{9}$.

JavaScript should be enabled to grade this question.

_1 point_

If $f$ approaches to $L$ as $(x,y)$ approaches to the origin along the straight line $y=mx$, then find the value of $L$.

$0$.

$\\frac{1}{m^2}$.

$\\frac{m}{1+m^3}$.

$1$.

### No, the answer is incorrect.  
Score: 0

### Feedback:

![](extracted/assets/Term-Feb-to-May_Mathematics-II_Week9_Solvewithus9-NotGraded_IITMOnlineDegree30_4_20267_24_26am_32.jpg)

### Accepted Answers:

$\\frac{m}{1+m^3}$.

JavaScript should be enabled to grade this question.

_1 point_

Choose the set of correct options.

$\\lim \\limits\_{(x,y)\\to (0,0)}f(x,y)$ does not exist.

$\\lim \\limits\_{(x,y)\\to (0,0)}f(x,y)=0$.

$f$ is not continuous at the origin.

$\\lim \\limits\_{(x,y)\\to (0,0)}f(x,y)=\\frac{1}{2}$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\lim \\limits\_{(x,y)\\to (0,0)}f(x,y)$ does not exist.

$f$ is not continuous at the origin.

  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Consider the function $f: D\\rightarrow \\mathbb{R}$ where $D\\subset \\mathbb{R}^2$, defined as:  
  
                    $f(x,y) = \\begin{cases} \\frac{y}{x^2+y} & \\text{if } (x,y) \\neq (0,0) \\\\ 0 & \\text{if } (x,y)=(0,0) \\end{cases}$  
  
Choose the set of correct options.  
\[Hint: Approach the origin using the curves $y=x^2$ and $y=2x^2$.\]

$\\lim \\limits\_{(x,y)\\to (0,0)}f(x,y)$ does not exist.

$\\lim \\limits\_{(x,y)\\to (0,0)}f(x,y)=0$.

$f$ is not continuous at the origin.

$\\lim \\limits\_{(x,y)\\to (0,0)}f(x,y)=1$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$\\lim \\limits\_{(x,y)\\to (0,0)}f(x,y)$ does not exist.

$f$ is not continuous at the origin.

  
  
  
$\\textbf{Key Points: 6}$  
  

*   $\\textbf{Gradient of a function:}$ If $f$ is a scalar valued function defined on a domain $D$ in $\\mathbb{R}^n$, then the gradient $\\nabla f$ is defined as the vector valued function $\\left (\\frac{\\partial f}{\\partial x\_1}, \\frac{\\partial f}{\\partial x\_2}, \\ldots, \\frac{\\partial f}{\\partial x\_n} \\right )$.
*   If $\\nabla f$ exists and is continuous in an open ball around the point $(a\_1 , a\_2 , \\ldots , a\_n )$, then the directional derivative of the function $f$ at $(a\_1 , a\_2 , \\ldots , a\_n )$ in the direction of a vector $v$ is given by the dot product of the gradient of the function at $(a\_1 , a\_2 , \\ldots , a\_n )$ with the unit vector in the direction of $v$ i.e.,

  
                              $D\_vf(a\_1,a\_2, \\ldots, a\_n)=\\nabla f(a\_1, a\_2, \\ldots, a\_n). \\frac{v}{||v||}$  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Find the directional derivative of the function $f:\\mathbb{R}^2\\rightarrow \\mathbb{R}$ such that $f(x,y)=3x^2-2xy$ in the direction of the vector $(3,4)$.

$2x-\\frac{6y}{5}$.

$10x-6y$.

$10x$.

$2x$.

$-\\frac{6y}{5}$.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$2x-\\frac{6y}{5}$.

JavaScript should be enabled to grade this question.

_1 point_

Find the directional derivative of the function $f: \\mathbb{R}^2\\rightarrow \\mathbb{R}$ such that $f(x,y)=3x^2+2y^2$ at the point $(1,1)$ along the direction of it's gradient vector $\\nabla f(1,1)$.  
\[Hint: First find out the unit vector in the direction of the vector $\\nabla f(1,1)$.\]

$2$

$\\sqrt{13}$

$2 \\sqrt{13}$

$2\\sqrt{2}$

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$2 \\sqrt{13}$

  

Check Answers

Your score is: 0/16

Please enable JavaScript to continue using this application.