---
title: "Reflect with us - Week 5 :: IITM Online Degree"
---

# Reflect with us - Week 5 :: IITM Online Degree

Reflect with us - Week 5

# Reflect with us - Week 5

This assignment will not be graded and is only for practice.

JavaScript should be enabled to grade this question.

_1 point_

Consider a map $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ defined as $T(v)= Av$, where $v=\\begin{bmatrix} x \\\\ y \\end{bmatrix}$, $A=\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ and $det(A)\\neq 0$. Which of the following options are correct?

$T$ is a linear transformation.

$T$ is both one-one and onto.

$T$ is neither one-one nor onto.

$T$ is one-one but not onto.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

$T$ is a linear transformation.

$T$ is both one-one and onto.

  
              ![](extracted/assets/Term-Feb-to-May_Mathematics-II_Week5_Reflectwithus-Week5_IITMOnlineDegree13_4_20267_09_23am_25.jpg)  
  

*   $\\textbf{Step 1:}$ 
    
    JavaScript should be enabled to grade this question.
    
    _1 point_
    
    What is $T(v\_1+v\_2)$?
    
    $A(v\_1+v\_2)$.
    
    $Av\_1 v\_2$.
    
    ### No, the answer is incorrect.  
    Score: 0
    
    ### Accepted Answers:
    
    $A(v\_1+v\_2)$.
    

            $\\textbf{Recall:}$ $A(v\_1+v\_2)=Av\_1+ Av\_2$  

*   $\\textbf{Step 2:}$ 
    
    JavaScript should be enabled to grade this question.
    
    _1 point_
    
    Is $T(v\_1+v\_2)=T(v\_1)+T(v\_2)$?
    
     Yes.
    
     No.
    
    ### No, the answer is incorrect.  
    Score: 0
    
    ### Accepted Answers:
    
    Yes.
    

           $\\textbf{Check:}$ $T(cv)=cT(v)$.  

*   Hence $T$ is linear transformation. So Option 1 is true.
*   $\\textbf{Another method:}$ Write the definition of $T$ explicitly as,

                                        $T(x,y)=(ax+by, cx+dy)$  

*   $\\textbf{Step 1:}$ What is $T((x\_1,y\_1)+(x\_2+y\_2))$?

                   
                                          $\\begin{aligned} T(x\_1+x\_2, y\_1+y\_2) &= (a(x\_1+x\_2)+b(y\_1+y\_2) , c(x\_1+x\_2)+d(y\_1+y\_2)) \\\\ &= (ax\_1+ax\_2+by\_1+by\_2, cx\_1+cx\_2+dy\_1+dy\_2) \\\\ &= (ax\_1+by\_1, cx\_1+dy\_1)+ (ax\_2+by\_2, cx\_2+dy\_2) \\\\ &= T(x\_1,y\_1)+ T(x\_2,y\_2) \\end{aligned}$  

*   $\\textbf{Step 2:}$ 
    
    JavaScript should be enabled to grade this question.
    
    _1 point_
    
    Is $T(c(x,y))=cT(x,y)$?
    
     Yes.
    
     No.
    
    ### No, the answer is incorrect.  
    Score: 0
    
    ### Accepted Answers:
    
    Yes.
    

*   Hence $T$ is linear transformation. So Option 1 is true.

  
                ![](extracted/assets/Term-Feb-to-May_Mathematics-II_Week5_Reflectwithus-Week5_IITMOnlineDegree13_4_20267_09_23am_26.jpg)  
  
Now in the given problem $T(v)=0$, implies $Av=0$. This is the matrix representation of the system of linear equations:  
                                  $\\begin{aligned} ax+by &= 0 \\\\ cx+dy &=0 \\end{aligned}$  

*   $\\textbf{Step 3:}$ 
    
    JavaScript should be enabled to grade this question.
    
    _1 point_
    
    If the system of linear equations $Av=0$ has a unique solution, then what is the solution?
    
    $v=0$
    
    $v$ can be any vector in $\\mathbb{R}^2$.
    
    ### No, the answer is incorrect.  
    Score: 0
    
    ### Accepted Answers:
    
    $v=0$
    
*   $\\textbf{Step 4:}$ 
    
    JavaScript should be enabled to grade this question.
    
    _1 point_
    
    What is the condition on $A$, for which the system of linear equations $Av=0$ has a unique solution? \[Recall from Weeks 1 and 2\]
    
    $det(A)=0$.
    
    $det(A)\\neq 0$.
    
    ### No, the answer is incorrect.  
    Score: 0
    
    ### Accepted Answers:
    
    $det(A)\\neq 0$.
    

   Concluding, we can say that, if $det(A)$ is non-zero, then $T(v)=0$ implies $v=0$. Hence $T$ is one to one.  

*   Let $w=\\begin{bmatrix} w\_1 \\\\ w\_2 \\end{bmatrix} \\in \\mathbb{R}^2$. We are going to find whether there exists a vector $v=\\begin{bmatrix} x \\\\ y \\end{bmatrix}\\in \\mathbb{R}^2$, such that $T(v)=Av=w$.

           $Av=w$ is the matrix representation of the system of linear equation:  
                                                    $\\begin{aligned} ax+by &= w\_1 \\\\ cx+dy &= w\_2 \\end{aligned}$  

*   $\\textbf{Step 5:}$ 
    
    JavaScript should be enabled to grade this question.
    
    _1 point_
    
    If $det(A)\\neq 0$, then what can we say about the solution of the above system of linear equations?
    
     No solution.
    
     Unique solution.
    
    ### No, the answer is incorrect.  
    Score: 0
    
    ### Accepted Answers:
    
    Unique solution.
    

Concluding from this, we can say that, if $det(A)\\neq 0$, then $T$ is onto.  
  
$\\textbf{Hence, Options 1 and 2 are the correct options.}$

Check Answers

Your score is: 0/7

Please enable JavaScript to continue using this application.