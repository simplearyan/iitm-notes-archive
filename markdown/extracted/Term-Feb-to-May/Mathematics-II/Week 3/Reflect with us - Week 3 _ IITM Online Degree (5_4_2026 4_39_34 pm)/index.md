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

Any set of 333 vectors in R3\\mathbb{R}^3R3 is linearly independent.

Any set of 444 vectors in R3\\mathbb{R}^3R3 is linearly dependent.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Any subset of any linearly independent set of vectors is linearly independent.

Any set of 444 vectors in R3\\mathbb{R}^3R3 is linearly dependent.

  
  
            Recall the definition of linearly dependent and independent:\\textbf{Recall the definition of linearly dependent and independent:}Recall the definition of linearly dependent and independent:  
 Statement 1) Definition of linear dependence: A set of vectors {v1,v2,…vn}\\{ v\_1, v\_2, \\ldots v\_n \\} {v1​,v2​,…vn​} in VVV is said to be linearly dependent if there exist scalars a1,a2,…an∈Ra\_1, a\_2,\\ldots a\_n \\in \\mathbb{R}a1​,a2​,…an​∈R, not all zero such that a1v1+a2v2+…+anvn\=0a\_1v\_1+a\_2v\_2+\\ldots+a\_nv\_n = 0a1​v1​+a2​v2​+…+an​vn​\=0.  
Statement 2) Definition of linear independence: A set of vectors {v1,v2,…vn}\\{ v\_1, v\_2, \\ldots v\_n \\}{v1​,v2​,…vn​} in VVV is said to be linearly independent if a1v1+a2v2+…+anvn\=0a\_1v\_1+a\_2v\_2+\\ldots+a\_nv\_n = 0a1​v1​+a2​v2​+…+an​vn​\=0 implies that ai\=0a\_i = 0 ai​\=0 for i\=1,2,…ni = 1, 2, \\ldots ni\=1,2,…n.  
Statement 3) If SSS is a set containing zero vector, then the set SSS is a linearly dependent set.  
Statement 4) Let SSS be a subset of a vector space VVV. If an element of SSS is a scalar multiple of another element from the set SSS, then SSS is a linearly dependent set.  
Statement 5) If SSS is linearly dependent, then there exists v∈Sv\\in Sv∈S, such that vvv can be written as a linear combination of other vectors in SSS and vice versa.  
  
Discussion on Option 1:\\textbf{Discussion on Option 1:}Discussion on Option 1: Let S\={v1,v2,…,vn}S=\\{ v\_1, v\_2, \\ldots, v\_n\\}S\={v1​,v2​,…,vn​} be a linearly independent set of vectors and let S′S'S′ be a subset of SSS.  
Claim:\\textbf{Claim:}Claim: S′S'S′ is linearly independent.  

JavaScript should be enabled to grade this question.

_1 point_

**What we have to assume for** S′S'S′ **if we want to use the method of contradiction?**

Let us assume that S′S'S′ is linearly dependent.

Let us assume that S′S'S′ is linearly independent.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Let us assume that S′S'S′ is linearly dependent.

  
If S′S'S′ is linearly dependent, then there exists v∈S′v\\in S'v∈S′, such that vvv can be written as a linear combination of other vectors in S′S'S′.  
  

JavaScript should be enabled to grade this question.

Which of the above statements we are using here?

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 5

_1 point_

  
v∈S′v\\in S'v∈S′ implies v∈Sv\\in Sv∈S, as S′⊆SS'\\subseteq SS′⊆S. Those vectors of whose linear combination is giving vvv are also in SSS due to the same argument.  

JavaScript should be enabled to grade this question.

_1 point_

Again from statement 5, can we conclude that SSS is linearly dependent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  
  
But SSS was given to be a linearly independent set, hence we arrive at a contradiction. So our claim is proved.  
Another method:\\textbf{Another method:}Another method: Let S′\={vi1,vi2,…,vik}⊆SS'=\\{ v\_{i\_1}, v\_{i\_2}, \\ldots, v\_{i\_k} \\} \\subseteq SS′\={vi1​​,vi2​​,…,vik​​}⊆S. Consider the equation  
  
                                                           a1vi1+a2vi2+…+akvik\=0a\_1 v\_{i\_1}+a\_2 v\_{i\_2}+ \\ldots+ a\_kv\_{i\_k}=0a1​vi1​​+a2​vi2​​+…+ak​vik​​\=0  

JavaScript should be enabled to grade this question.

_1 point_

Can we conclude each ai\=0a\_i=0ai​\=0 from here?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  
  
As all the vijv\_{i\_j}vij​​ are also in SSS, the given equation is a linear combination of vectors from SSS. Now as SSS is linear independent, ai\=0a\_i=0ai​\=0 for each i∈{1,2,…,k}i\\in \\{ 1,2, \\ldots, k\\}i∈{1,2,…,k}. Hence S′S'S′ is linearly independent.  
∙\\bullet∙ Now try Question 7 and 8 of activity 3.3\\textbf{Now try Question 7 and 8 of activity 3.3}Now try Question 7 and 8 of activity 3.3  
  
Discussion on Option 2:\\textbf{Discussion on Option 2:}Discussion on Option 2: Let us discuss an example. Let S\={(1,0,0),(0,1,0),(1,1,0)}S=\\{(1,0,0), (0,1,0), (1,1,0)\\}S\={(1,0,0),(0,1,0),(1,1,0)} be a subset of R3\\mathbb{R}^3R3.  

JavaScript should be enabled to grade this question.

_1 point_

Is SSS linearly dependent?

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

Can you find a linearly independent subset of SSS?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Feedback:

Hint: Check that any proper subset of SSS of cardinality 1 or 2 is linearly independent subset of SSS.

### Accepted Answers:

Yes.

  
  
Consider S′\={(1,0,0),(0,1,0)}S'=\\{ (1,0,0), (0,1,0) \\}S′\={(1,0,0),(0,1,0)}.  

JavaScript should be enabled to grade this question.

_1 point_

Is S′⊆SS'\\subseteq SS′⊆S?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  

JavaScript should be enabled to grade this question.

_1 point_

Is S′S'S′ linearly independent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  
  
Hence Option 2 is not correct.  
  
Discussion on Option 3:\\textbf{Discussion on Option 3:}Discussion on Option 3: Here also we construct an example. Let S\={(1,0,0),(2,0,0),(3,0,0)}S=\\{(1,0,0), (2,0,0), (3,0,0) \\} S\={(1,0,0),(2,0,0),(3,0,0)}.  

JavaScript should be enabled to grade this question.

_1 point_

Is SSS linearly dependent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  
  
Consider S′\={(1,0,0),(2,0,0)}S'=\\{ (1,0,0), (2,0,0) \\}S′\={(1,0,0),(2,0,0)}.  

JavaScript should be enabled to grade this question.

_1 point_

Is S′⊆SS'\\subseteq SS′⊆S?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Yes.

  

JavaScript should be enabled to grade this question.

_1 point_

Is S′S'S′ linearly independent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

No.

  
  
Hence Option 3 is not correct.  
  
Discussion on Option 4:\\textbf{Discussion on Option 4:}Discussion on Option 4: Consider the same set S\={(1,0,0),(2,0,0),(3,0,0)}S=\\{(1,0,0), (2,0,0), (3,0,0) \\} S\={(1,0,0),(2,0,0),(3,0,0)} that we have discussed previously.  

JavaScript should be enabled to grade this question.

_1 point_

Is SSS linearly independent?

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

  
∙\\bullet∙ Now try Question 5 and 8 of activity 3.4\\textbf{Now try Question 5 and 8 of activity 3.4}Now try Question 5 and 8 of activity 3.4  
  
  
Discussion on Option 5:\\textbf{Discussion on Option 5:}Discussion on Option 5: Let S\={v1,v2,v3,v4}S=\\{ v\_1, v\_2, v\_3, v\_4 \\}S\={v1​,v2​,v3​,v4​} be a set of 4 vectors in R3\\mathbb{R}^3R3. Let v1\=(x1,y1,z1)v\_1=(x\_1, y\_1,z\_1)v1​\=(x1​,y1​,z1​), v2\=(x2,y2,z2)v\_2=(x\_2,y\_2,z\_2)v2​\=(x2​,y2​,z2​), v3\=(x3,y3,z3)v\_3=(x\_3, y\_3, z\_3)v3​\=(x3​,y3​,z3​), v4\=(x4,y4,z4)v\_4=(x\_4, y\_4, z\_4)v4​\=(x4​,y4​,z4​). Consider the following equation,  
  
                                             a1v1+a2v2+a3v3+a4v4\=0 a\_1v\_1+ a\_2v\_2+a\_3v\_3+a\_4v\_4=0 a1​v1​+a2​v2​+a3​v3​+a4​v4​\=0  
i.e.,  
                                               
                          a1(x1,y1,z1)+a2(x2,y2,z2)+a3(x3,y3,z3)+a4(x4,y4,z4)\=(0,0,0)a\_1 (x\_1, y\_1,z\_1)+ a\_2 (x\_2,y\_2,z\_2)+ a\_3 (x\_3, y\_3, z\_3)+ a\_4 (x\_4, y\_4, z\_4)=(0,0,0) a1​(x1​,y1​,z1​)+a2​(x2​,y2​,z2​)+a3​(x3​,y3​,z3​)+a4​(x4​,y4​,z4​)\=(0,0,0)  
 i.e.,  
  
                                            a1x1+a2x2+a3x3+a4x4\=0a1y1+a2y2+a3y3+a4y4\=0a1z1+a2z2+a3z3+a4z4\=0\\begin{aligned} a\_1 x\_1 + a\_2 x\_2 + a\_3 x\_3 + a\_4x\_4 &= 0 \\\\ a\_1 y\_1 + a\_2 y\_2 + a\_3 y\_3 + a\_4y\_4 &= 0 \\\\ a\_1 z\_1 + a\_2 z\_2 + a\_3 z\_3 + a\_4z\_4 &= 0 \\\\ \\end{aligned}a1​x1​+a2​x2​+a3​x3​+a4​x4​a1​y1​+a2​y2​+a3​y3​+a4​y4​a1​z1​+a2​z2​+a3​z3​+a4​z4​​\=0\=0\=0​  
  
The matrix representation of this system of linear equations is given by  
  
                    \[x1x2x3x4y1y2y3y4z1z2z3z4\]\[a1a2a3a4\]\=\[000\] \\begin{bmatrix} x\_1 & x\_2 & x\_3 & x\_4 \\\\ y\_1 & y\_2 & y\_3 & y\_4 \\\\ z\_1 & z\_2 & z\_3 & z\_4 \\end{bmatrix} \\begin{bmatrix} a\_1 \\\\ a\_2 \\\\ a\_3 \\\\ a\_4 \\end{bmatrix} =\\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\end{bmatrix} ​x1​y1​z1​​x2​y2​z2​​x3​y3​z3​​x4​y4​z4​​​​a1​a2​a3​a4​​​\=​000​​  
  
We want to find the solution for the vector \[a1a2a3a4\]\\begin{bmatrix} a\_1 \\\\ a\_2 \\\\ a\_3 \\\\ a\_4 \\end{bmatrix}​a1​a2​a3​a4​​​ for this given homogeneous system of linear equations.  
  

JavaScript should be enabled to grade this question.

_1 point_

What can we say about the solutions of this system of linear equations?

 The solution is unique.

 There are infinitely many solutions.

 There must exist a non-zero solution.

000 is the only solution.

### No, the answer is incorrect.  
Score: 0

### Feedback:

Hint: Try to compute the maximum number of dependent variables you can get from the row reduced echelon form of the above matrix.

### Accepted Answers:

There are infinitely many solutions.

There must exist a non-zero solution.

  

JavaScript should be enabled to grade this question.

_1 point_

Is SSS linearly independent?

 Yes.

 No.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

No.

  
  
Hence Option 5 is correct.  
∙\\bullet∙This will help you to solve Question number 4 of the graded assignment.\\textbf{This will help you to solve Question number 4 of the graded assignment.}This will help you to solve Question number 4 of the graded assignment.

Check Answers

Your score is: 0/16

Please enable JavaScript to continue using this application.