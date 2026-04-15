# Reflect with us - Week 3 _ IITM Online Degree (5_4_2026 4_39_34 pm)

 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 Choose the set of correct options.
 
 
 
 
 
 Any subset of any linearly independent set of vectors is linearly independent. 
 
 
 
 
 
 
 Any subset of any linearly dependent set of vectors is linearly dependent.
 
 
 
 
 
 
 Any subset of any linearly dependent set of vectors is linearly independent.
 
 
 
 
 
 
 
Any set of $3$ vectors in $\mathbb{R}^3$ is linearly independent.

 
 
 
 
 
 
 
Any set of $4$ vectors in $\mathbb{R}^3$ is linearly dependent.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 Any subset of any linearly independent set of vectors is linearly independent. 
 
 
Any set of $4$ vectors in $\mathbb{R}^3$ is linearly dependent.
 
 
 

            $\textbf{Recall the definition of linearly dependent and independent:}$

 Statement 1) Definition of linear dependence: A set of vectors $\{ v_1, v_2, \ldots v_n \}$ in $V$ is said to be linearly dependent if there exist scalars $a_1, a_2,\ldots a_n \in \mathbb{R}$, not all zero such that $a_1v_1+a_2v_2+\ldots+a_nv_n = 0$.

Statement 2) Definition of linear independence: A set of vectors $\{ v_1, v_2, \ldots v_n \}$ in $V$ is said to be linearly independent if $a_1v_1+a_2v_2+\ldots+a_nv_n = 0$ implies that $a_i = 0$ for $i = 1, 2, \ldots n$.

Statement 3) If $S$ is a set containing zero vector, then the set $S$ is a linearly dependent set.

Statement 4) Let $S$ be a subset of a vector space $V$. If an element of $S$ is a scalar multiple of another element from the set $S$, then $S$ is a linearly dependent set. 
Statement 5) If $S$ is linearly dependent, then there exists $v\in S$, such that $v$ can be written as a linear combination of other vectors in $S$ and vice versa. 

$\textbf{Discussion on Option 1:}$ Let $S=\{ v_1, v_2, \ldots, v_n\}$ be a linearly independent set of vectors and let $S'$ be a subset of $S$. 
 
 
$\textbf{Claim:}$ $S'$ is linearly independent. 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
**What we have to assume for** $S'$** if we want to use the method of contradiction?**
 
 
 
 
 
 
Let us assume that $S'$ is linearly dependent.
 
 
 
 
 
 
 
Let us assume that $S'$ is linearly independent.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 
Let us assume that $S'$ is linearly dependent.
 
 
 

If $S'$ is linearly dependent, then there exists $v\in S'$, such that $v$ can be written as a linear combination of other vectors in $S'$.

    

 
 
 
 
 
 Which of the above statements we are using here?
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:
(Type: Numeric) 5
 
 
 *
 
 
 1 point
 
 *
 

$v\in S'$ implies $v\in S$, as $S'\subseteq S$. Those vectors of whose linear combination is giving $v$ are also in $S$ due to the same argument.

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Again from statement 5, can we conclude that $S$ is linearly dependent? 
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 Yes.
 
 
 

But $S$ was given to be a linearly independent set, hence we arrive at a contradiction. So our claim is proved. 

$\textbf{Another method:}$ Let $S'=\{ v_{i_1}, v_{i_2}, \ldots, v_{i_k} \} \subseteq S$. 
Consider the equation 

                                                           $a_1 v_{i_1}+a_2 v_{i_2}+ \ldots+ a_kv_{i_k}=0$

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Can we conclude each $a_i=0$ from here? 
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 Yes.
 
 
 

As all the $v_{i_j}$ are also in $S$, the given equation is a linear combination of vectors from $S$. Now as $S$ is linear independent, $a_i=0$ for each $i\in \{ 1,2, \ldots, k\}$. Hence $S'$
 is linearly independent. 
 
 
$\bullet$ $\textbf{Now try Question 7 and 8 of activity 3.3}$
 

$\textbf{Discussion on Option 2:}$ Let us discuss an example. Let $S=\{(1,0,0), (0,1,0), (1,1,0)\}$ be a subset of $\mathbb{R}^3$. 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Is $S$ linearly dependent? 
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
**Hint:** (1, 1, 0) = (1, 0, 0) + (0, 1, 0)
### Accepted Answers:

 Yes.
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Can you find a linearly independent subset of $S$? 
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
Hint: Check that any proper subset of $S$ of cardinality 1 or 2 is linearly independent subset of $S$. 
### Accepted Answers:

 Yes.
 
 
 

Consider $S'=\{ (1,0,0), (0,1,0) \}$. 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Is $S'\subseteq S$?
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 Yes.
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Is $S'$ linearly independent?
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 Yes.
 
 
 

Hence Option 2 is not correct.

$\textbf{Discussion on Option 3:}$ Here also we construct an example. Let $S=\{(1,0,0), (2,0,0), (3,0,0) \}$.

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Is $S$ linearly dependent?
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 Yes.
 
 
 

Consider $S'=\{ (1,0,0), (2,0,0) \}$.

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Is $S'\subseteq S$?
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 Yes.
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Is $S'$ linearly independent? 
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 No.
 
 
 

Hence Option 3 is not correct. 
 

$\textbf{Discussion on Option 4:}$ Consider the same set $S=\{(1,0,0), (2,0,0), (3,0,0) \}$ that we have discussed previously.

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Is $S$ linearly independent?
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 No.
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 What can we conclude about Option 4 from this?
 
 
 
 
 
 Option 4 is correct.
 
 
 
 
 
 
 Option 4 is not correct.
 
 
 
 
 
 
 Nothing can be concluded about Option 4 from here. 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 Option 4 is not correct.
 
 
 

$\bullet$ $\textbf{Now try Question 5 and 8 of activity 3.4}$

$\textbf{Discussion on Option 5:}$ Let $S=\{ v_1, v_2, v_3, v_4 \}$ be a set of 4 vectors in $\mathbb{R}^3$. 
Let $v_1=(x_1, y_1,z_1)$, $v_2=(x_2,y_2,z_2)$, $v_3=(x_3, y_3, z_3)$, $v_4=(x_4, y_4, z_4)$. Consider the following equation, 

                                             $a_1v_1+ a_2v_2+a_3v_3+a_4v_4=0$

i.e., 
                                             
                          $a_1 (x_1, y_1,z_1)+ a_2 (x_2,y_2,z_2)+ a_3 (x_3, y_3, z_3)+ a_4 (x_4, y_4, z_4)=(0,0,0)$

 i.e., 

                                            $\begin{aligned}
 a_1 x_1 + a_2 x_2 + a_3 x_3 + a_4x_4 &= 0 \\
 a_1 y_1 + a_2 y_2 + a_3 y_3 + a_4y_4 &= 0 \\
 a_1 z_1 + a_2 z_2 + a_3 z_3 + a_4z_4 &= 0 \\
\end{aligned}$

The matrix representation of this system of linear equations is given by 

                    $\begin{bmatrix}
x_1 & x_2 & x_3 & x_4 \\
y_1 & y_2 & y_3 & y_4 \\
z_1 & z_2 & z_3 & z_4 
\end{bmatrix} \begin{bmatrix}
a_1 \\ a_2 \\ a_3 \\ a_4
\end{bmatrix} =\begin{bmatrix}
0 \\ 0 \\ 0
\end{bmatrix}$

We want to find the solution for the vector $\begin{bmatrix}
a_1 \\ a_2 \\ a_3 \\ a_4
\end{bmatrix}$ for this given homogeneous system of linear equations. 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 What can we say about the solutions of this system of linear equations? 
 
 
 
 
 
 The solution is unique. 
 
 
 
 
 
 
 There are infinitely many solutions. 
 
 
 
 
 
 
 There must exist a non-zero solution. 
 
 
 
 
 
 
 
$0$ is the only solution.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
Hint: Try to compute the maximum number of dependent variables you can get from the row reduced echelon form of the above matrix. 
### Accepted Answers:

 There are infinitely many solutions. 
 
 There must exist a non-zero solution. 
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 
Is $S$ linearly independent? 
 
 
 
 
 
 Yes.
 
 
 
 
 
 
 No.
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 No.
 
 
 

Hence Option 5 is correct. 

$\bullet$$\textbf{This will help you to solve Question number 4 of the graded assignment.}$