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

*   If AAA is a square matrix, then the minor of the entry in the iii\-th row and jjj\-th column (denoted by MijM\_{ij}Mij​) is the determinant of the submatrix formed by deleting the iii\-th row and jjj\-th column.
*   The ijijij\-th cofactor (denoted by CijC\_{ij}Cij​) is defined to be (−1)i+jMij(-1)^{i+j}M\_{ij}(−1)i+jMij​.

**Calculating the determinant:  
  

*   det(A)\=∑i\=1naij(−1)i+jMij\=∑i\=1naijCijdet(A)=\\sum\_{i=1}^n a\_{ij}(-1)^{i+j}M\_{ij}= \\sum\_{i=1}^n a\_{ij}C\_{ij} det(A)\=∑i\=1n​aij​(−1)i+jMij​\=∑i\=1n​aij​Cij​**  Let us consider a 3×33\\times 33×3 matrix AAA as follows:  
   
A\=\[a11a12a13a21a22a23a31a32a33\]A= \\begin{bmatrix} a\_{11} & a\_{12} & a\_{13} \\\\ a\_{21} & a\_{22} & a\_{23} \\\\ a\_{31} & a\_{32} & a\_{33} \\end{bmatrix} A\=​a11​a21​a31​​a12​a22​a32​​a13​a23​a33​​​  
  
   
**Calculating M11M\_{11}M11​ and C11C\_{11}C11​:**  
  
• Find out the sub-matrix by deleting the first row and the first column:  
 \[∙∙∙∙a22a23∙a32a33\] \\begin{bmatrix} \\bullet & \\bullet & \\bullet \\\\ \\bullet & a\_{22} & a\_{23} \\\\ \\bullet & a\_{32} & a\_{33} \\end{bmatrix} ​∙∙∙​∙a22​a32​​∙a23​a33​​​   
  
• Calculating the determinant of the sub-matrix:  
 det(\[a22a23a32a33\])\=a22a33−a32a23 det \\left( \\begin{bmatrix} a\_{22} & a\_{23} \\\\ a\_{32} & a\_{33} \\end{bmatrix} \\right ) = a\_{22}a\_{33}-a\_{32} a\_{23} det(\[a22​a32​​a23​a33​​\])\=a22​a33​−a32​a23​   

*     M11\=a22a33−a32a23M\_{11}= a\_{22}a\_{33}-a\_{32} a\_{23}M11​\=a22​a33​−a32​a23​
*     C11\=(−1)1+1(a22a33−a32a23)\=a22a33−a32a23C\_{11}=(-1)^{1+1} (a\_{22}a\_{33}-a\_{32} a\_{23})= a\_{22}a\_{33}-a\_{32} a\_{23}C11​\=(−1)1+1(a22​a33​−a32​a23​)\=a22​a33​−a32​a23​ 

**Calculating M23M\_{23}M23​ and C23:C\_{23}:C23​:  
**  
• Find out the sub-matrix by deleting the second row and the third column:  
 \[a11a12∙∙∙∙a31a32∙\] \\begin{bmatrix} a\_{11} & a\_{12} & \\bullet \\\\ \\bullet & \\bullet & \\bullet \\\\ a\_{31} & a\_{32} & \\bullet \\end{bmatrix} ​a11​∙a31​​a12​∙a32​​∙∙∙​​   
• Calculating the determinant of the sub-matrix:  
 det(\[a11a12a31a32\])\=a11a32−a31a12 det \\left( \\begin{bmatrix} a\_{11} & a\_{12} \\\\ a\_{31} & a\_{32} \\end{bmatrix} \\right ) = a\_{11}a\_{32}-a\_{31} a\_{12} det(\[a11​a31​​a12​a32​​\])\=a11​a32​−a31​a12​   

*     M23\=a11a32−a31a12M\_{23}= a\_{11}a\_{32}-a\_{31} a\_{12}M23​\=a11​a32​−a31​a12​
*     C23\=(−1)2+3(a11a32−a31a12)\=−a11a32+a31a12C\_{23}=(-1)^{2+3} (a\_{11}a\_{32}-a\_{31} a\_{12})= - a\_{11}a\_{32} + a\_{31} a\_{12}C23​\=(−1)2+3(a11​a32​−a31​a12​)\=−a11​a32​+a31​a12​ 

**Calculating the determinant of A:  
**  

*   Expanding with respect to the first row:

  
  det(A)\=a11(−1)1+1M11+a12(−1)1+2M12+a13(−1)1+3M13det(A)= a\_{11}(-1)^{1+1}M\_{11} + a\_{12}(-1)^{1+2}M\_{12} + a\_{13}(-1)^{1+3}M\_{13}det(A)\=a11​(−1)1+1M11​+a12​(−1)1+2M12​+a13​(−1)1+3M13​   
  

*   Expanding with respect to the second row:

  
det(A)\=a21(−1)2+1M21+a22(−1)2+2M22+a23(−1)2+3M23det(A)= a\_{21}(-1)^{2+1}M\_{21} + a\_{22}(-1)^{2+2}M\_{22} + a\_{23}(-1)^{2+3}M\_{23}det(A)\=a21​(−1)2+1M21​+a22​(−1)2+2M22​+a23​(−1)2+3M23​  
  

*   Expanding with respect to the third row:

  
         det(A)\=a31(−1)3+1M31+a32(−1)3+2M32+a33(−1)3+3M33det(A)= a\_{31}(-1)^{3+1}M\_{31} + a\_{32}(-1)^{3+2}M\_{32} + a\_{33}(-1)^{3+3}M\_{33}det(A)\=a31​(−1)3+1M31​+a32​(−1)3+2M32​+a33​(−1)3+3M33​   
  
The determinant can also be calculated by expanding along columns.  
  

*   Expanding with respect to the first column:

det(A)\=a11(−1)1+1M11+a21(−1)2+1M21+a31(−1)3+1M31det(A)= a\_{11}(-1)^{1+1}M\_{11} + a\_{21}(-1)^{2+1}M\_{21} + a\_{31}(-1)^{3+1}M\_{31}det(A)\=a11​(−1)1+1M11​+a21​(−1)2+1M21​+a31​(−1)3+1M31​  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

Consider a square matrix A\=\[−12020−1−101\]A = \\begin{bmatrix} -1 & 2 & 0\\\\ 2 & 0 & -1\\\\ -1 & 0 & 1 \\end{bmatrix}A\=​−12−1​200​0−11​​. Find out M23M\_{23}M23​.  
 \[Hint: Find out the sub-matrix by deleting the second row and the third column: \[−12∙∙∙∙−10∙\] \\begin{bmatrix} -1 & 2 & \\bullet \\\\ \\bullet & \\bullet & \\bullet \\\\ -1 & 0 & \\bullet \\end{bmatrix} ​−1∙−1​2∙0​∙∙∙​​ Calculate the determinant of the sub-matrix. \]

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 2

_1 point_

JavaScript should be enabled to grade this question.

Consider a square matrix A\=\[−12020−1−101\]A = \\begin{bmatrix} -1 & 2 & 0\\\\ 2 & 0 & -1\\\\ -1 & 0 & 1 \\end{bmatrix}A\=​−12−1​200​0−11​​. Find out C32C\_{32}C32​.  
 \[Hint: Find out the sub-matrix by deleting the third row and the second column: \[−1∙02∙−1∙∙∙\] \\begin{bmatrix} -1 & \\bullet & 0 \\\\ 2 & \\bullet & -1 \\\\ \\bullet & \\bullet & \\bullet \\end{bmatrix} ​−12∙​∙∙∙​0−1∙​​ Calculate the determinant of the sub-matrix to find M32M\_{32}M32​. To find the cofactor C23C\_{23}C23​ the sign has to be taken care of as follows: C32\=(−1)3+2M32C\_{32}=(-1)^{3+2}M\_{32}C32​\=(−1)3+2M32​ \]

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) -1

_1 point_

JavaScript should be enabled to grade this question.

Consider a square matrix A\=\[−12020−1−101\]A = \\begin{bmatrix} -1 & 2 & 0\\\\ 2 & 0 & -1\\\\ -1 & 0 & 1 \\end{bmatrix}A\=​−12−1​200​0−11​​. Find out the determinant of AAA.  
 \[Hint: Expanding with respect to the first row:  
         det(A)\=a11(−1)1+1M11+a12(−1)1+2M12+a13(−1)1+3M13det(A)= a\_{11}(-1)^{1+1}M\_{11} + a\_{12}(-1)^{1+2}M\_{12} + a\_{13}(-1)^{1+3}M\_{13}det(A)\=a11​(−1)1+1M11​+a12​(−1)1+2M12​+a13​(−1)1+3M13​  
 Expanding with respect to any row will also give you the answer\]

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) -2

_1 point_

JavaScript should be enabled to grade this question.

_1 point_

Consider the following square matrices:   
 A\=\[201320142015201620172022201920202021\],B\=\[201620172022201320142015201920202021\] and C\=\[403240344044201320142015201920202021\]A = \\begin{bmatrix} 2013 & 2014 & 2015\\\\ 2016 & 2017 & 2022\\\\ 2019 & 2020 & 2021 \\end{bmatrix}, B = \\begin{bmatrix} 2016 & 2017 & 2022\\\\ 2013 & 2014 & 2015\\\\ 2019 & 2020 & 2021 \\end{bmatrix} \\text{ and } C = \\begin{bmatrix} 4032 & 4034 & 4044\\\\ 2013 & 2014 & 2015\\\\ 2019 & 2020 & 2021 \\end{bmatrix}A\=​201320162019​201420172020​201520222021​​,B\=​201620132019​201720142020​202220152021​​ and C\=​403220132019​403420142020​404420152021​​  
 Choose the set of correct options.  
 Hint:   

*    BBB can be obtained by interchanging the first two rows.
*    CCC can be obtained by multiplying 2 to the first row of BBB. 

det(B)\=det(A)det(B) = det(A)det(B)\=det(A).

det(A)\=−det(B)det(A) = - det(B)det(A)\=−det(B).

det(C)≠−2det(B)det(C) \\neq -2det(B)det(C)\=−2det(B).

det(C)\=−2det(A)det(C) = - 2det(A)det(C)\=−2det(A)

### No, the answer is incorrect.  
Score: 0

### Feedback:

• Sign of the determinant changes due to interchange of two rows.  
• If a scalar ccc is multiplied with a row of a matrix, then the determinant of the new matrix will be ccc times the determinant of the earlier matrix.

### Accepted Answers:

det(A)\=−det(B)det(A) = - det(B)det(A)\=−det(B).

det(C)≠−2det(B)det(C) \\neq -2det(B)det(C)\=−2det(B).

det(C)\=−2det(A)det(C) = - 2det(A)det(C)\=−2det(A)

  
  
  
**2\. Key Points:**  
**Cramers' Rule:** (This rule is applied to any system of linear equations with nnn equations and nnn variables. Here we recall the method for a system of linear equations with 333 equations and 333 variables.)  
  

*    Consider a system of linear equations as follows: a11x1+a12x2+a13x3\=b1a21x1+a22x2+a23x3\=b2a31x1+a32x2+a33x3\=b3\\begin{aligned} a\_{11}x\_1+ a\_{12}x\_2+ a\_{13}x\_3 = b\_1\\\\ a\_{21}x\_1+ a\_{22}x\_2+ a\_{23}x\_3 = b\_2\\\\ a\_{31}x\_1+ a\_{32}x\_2+ a\_{33}x\_3 = b\_3 \\end{aligned}a11​x1​+a12​x2​+a13​x3​\=b1​a21​x1​+a22​x2​+a23​x3​\=b2​a31​x1​+a32​x2​+a33​x3​\=b3​​ 

  

*   Let the matrix representation of the above system be Ax\=bAx=bAx\=b, where A\=\[a11a12a13a21a22a23a31a32a33\]A=\\begin{bmatrix} a\_{11} & a\_{12} & a\_{13} \\\\ a\_{21} & a\_{22} & a\_{23} \\\\ a\_{31} & a\_{32} & a\_{33} \\end{bmatrix}A\=​a11​a21​a31​​a12​a22​a32​​a13​a23​a33​​​, x\=\[x1x2x3\]x=\\begin{bmatrix} x\_1 \\\\ x\_2 \\\\ x\_3 \\end{bmatrix}x\=​x1​x2​x3​​​, and b\=\[b1b2b3\]b=\\begin{bmatrix} b\_1 \\\\ b\_2 \\\\ b\_3 \\end{bmatrix}b\=​b1​b2​b3​​​.

  

*   Let AxiA\_{x\_i}Axi​​ be the matrix obtained by replacing the iii\-th column of AAA (i.e.,\[a1ia2ia3i\])\\Bigg (i.e., \\begin{bmatrix} a\_{1i} \\\\ a\_{2i} \\\\ a\_{3i} \\end{bmatrix} \\Bigg)(i.e.,​a1i​a2i​a3i​​​) by bbb, for i\=1,2,3i=1,2,3i\=1,2,3.

  
Ax1\=\[b1a12a13b2a22a23b3a32a33\] A\_{x\_1}=\\begin{bmatrix} b\_1 & a\_{12} & a\_{13} \\\\ b\_2 & a\_{22} & a\_{23} \\\\ b\_3 & a\_{32} & a\_{33} \\end{bmatrix} Ax1​​\=​b1​b2​b3​​a12​a22​a32​​a13​a23​a33​​​  
Ax2\=\[a11b1a13a21b2a23a31b3a33\]A\_{x\_2}=\\begin{bmatrix} a\_{11} & b\_1 & a\_{13} \\\\ a\_{21} & b\_2 & a\_{23} \\\\ a\_{31} & b\_3 & a\_{33} \\end{bmatrix} Ax2​​\=​a11​a21​a31​​b1​b2​b3​​a13​a23​a33​​​  
Ax3\=\[a11a12b1a21a22b2a31a32b3\]A\_{x\_3}= \\begin{bmatrix} a\_{11} & a\_{12} & b\_1 \\\\ a\_{21} & a\_{22} & b\_2 \\\\ a\_{31} & a\_{32} & b\_3 \\end{bmatrix} Ax3​​\=​a11​a21​a31​​a12​a22​a32​​b1​b2​b3​​​  
 If det(A)≠0det(A) \\neq 0det(A)\=0, then the solutions to the above system are xi\=det Axidet A\\displaystyle x\_i= \\frac{det ~A\_{x\_i}}{det~ A}xi​\=det Adet Axi​​​, for i\=1,2,3i=1,2,3i\=1,2,3. i.e., x1\=det Ax1det A\\displaystyle x\_1= \\frac{det ~A\_{x\_1}}{det~ A} x1​\=det Adet Ax1​​​, x2\=det Ax2det A\\displaystyle x\_2= \\frac{det ~A\_{x\_2}}{det~ A} x2​\=det Adet Ax2​​​, x3\=det Ax3det A\\displaystyle x\_3= \\frac{det ~A\_{x\_3}}{det~ A} x3​\=det Adet Ax3​​​   
  
  
 Consider a system of linear equations x1+x3\=1−x1+x2−x3\=1−x2+x3\=1\\begin{aligned} x\_1+ x\_3 = 1\\\\ -x\_1+ x\_2- x\_3 = 1\\\\ -x\_2+ x\_3 = 1 \\end{aligned}x1​+x3​\=1−x1​+x2​−x3​\=1−x2​+x3​\=1​   
  
Let matrix representation of the above system be Ax\=bAx=bAx\=b, where A\=\[101−11−10−11\]A = \\begin{bmatrix} 1 & 0 & 1\\\\ -1 & 1 & -1\\\\ 0 & -1 & 1 \\end{bmatrix}A\=​1−10​01−1​1−11​​, x\=\[x1x2x3\]x = \\begin{bmatrix} x\_1\\\\ x\_2\\\\ x\_3 \\end{bmatrix}x\=​x1​x2​x3​​​ and b\=\[111\]b=\\begin{bmatrix} 1\\\\ 1\\\\ 1 \\end{bmatrix}b\=​111​​. Let AxiA\_{x\_i}Axi​​ be the matrix obtained by replacing the iii\-th column of AAA (i.e., \[a1ia2ia3i\]\\begin{bmatrix} a\_{1i} \\\\ a\_{2i} \\\\ a\_{3i} \\end{bmatrix}​a1i​a2i​a3i​​​) by bbb, for i\=1,2,3i=1,2,3i\=1,2,3.  
  
Use the above information to answer the following questions(5,6):  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Choose the set of correct options

Ax1\=\[110−11−10−11\]A\_{x\_1} = \\begin{bmatrix} 1 & 1 & 0\\\\ -1 & 1 & -1\\\\ 0 & -1 & 1 \\end{bmatrix}Ax1​​\=​1−10​11−1​0−11​​

Ax1\=\[10111−11−11\]A\_{x\_1} = \\begin{bmatrix} 1 & 0 & 1\\\\ 1 & 1 & -1\\\\ 1 & -1 & 1 \\end{bmatrix} Ax1​​\=​111​01−1​1−11​​

Ax2\=\[101−11−10−11\]A\_{x\_2} = \\begin{bmatrix} 1 & 0 & 1\\\\ -1 & 1 & -1\\\\ 0 & -1 & 1 \\end{bmatrix}Ax2​​\=​1−10​01−1​1−11​​

Ax3\=\[101−1110−11\]A\_{x\_3} = \\begin{bmatrix} 1 & 0 & 1\\\\ -1 & 1 & 1\\\\ 0 & -1 & 1 \\end{bmatrix}Ax3​​\=​1−10​01−1​111​​

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

Ax1\=\[10111−11−11\]A\_{x\_1} = \\begin{bmatrix} 1 & 0 & 1\\\\ 1 & 1 & -1\\\\ 1 & -1 & 1 \\end{bmatrix} Ax1​​\=​111​01−1​1−11​​

Ax3\=\[101−1110−11\]A\_{x\_3} = \\begin{bmatrix} 1 & 0 & 1\\\\ -1 & 1 & 1\\\\ 0 & -1 & 1 \\end{bmatrix}Ax3​​\=​1−10​01−1​111​​

JavaScript should be enabled to grade this question.

_1 point_

Choose the set of correct options about the solutions to this system.

x1\=−2x\_1 = −2x1​\=−2.

x2\=−2x\_2 = −2x2​\=−2.

x3\=3x\_3 = 3x3​\=3.

 None of the above.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

x1\=−2x\_1 = −2x1​\=−2.

x3\=3x\_3 = 3x3​\=3.

  
  

  

**3\. Key Points:  
  
Calculating the inverse of a matrix A:  
**  

*   Find out the cofactor matrix CCC, whose ijijij\-th element is CijC\_{ij}Cij​: the ijijij\-th cofactor of AAA.
*   Adjoint of AAA is transpose of CCC. 
*   Calculate the determinant of AAA and check whether it is non-zero or not. 
*   If determinant is non-zero then the inverse of AAA exists and is given by

   A−1\=1det(A)adj(A)A^{-1}=\\frac{1}{det(A)}adj(A)A−1\=det(A)1​adj(A).  
  

JavaScript should be enabled to grade this question.

JavaScript should be enabled to grade this question.

_1 point_

Which of the following is the cofactor matrix of \[323101211\]\\begin{bmatrix} 3 & 2 & 3 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 1 \\end{bmatrix}​312​201​311​​?  
 \[Hint: Recall the steps to calculate the cofactors, given in Key Points 1.\]

\[111−1−3−1−202\]\\begin{bmatrix} 1 & 1 & 1 \\\\ -1 & -3 & -1\\\\ -2 & 0 & 2 \\end{bmatrix}​1−1−2​1−30​1−12​​

\[−1121−3011−2\]\\begin{bmatrix} - 1 & 1 & 2 \\\\ 1 & -3 & 0\\\\ 1 & 1 & -2 \\end{bmatrix}​−111​1−31​20−2​​

\[−1111−3120−2\]\\begin{bmatrix} - 1 & 1 & 1 \\\\ 1 & -3 & 1\\\\ 2 & 0 & -2 \\end{bmatrix}​−112​1−30​11−2​​

\[1−1−1−13−1−202\]\\begin{bmatrix} 1 & -1 & -1 \\\\ -1 & 3 & -1\\\\ -2 & 0 & 2 \\end{bmatrix}​1−1−2​−130​−1−12​​

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

\[−1111−3120−2\]\\begin{bmatrix} - 1 & 1 & 1 \\\\ 1 & -3 & 1\\\\ 2 & 0 & -2 \\end{bmatrix}​−112​1−30​11−2​​

JavaScript should be enabled to grade this question.

_1 point_

Which of the following is the adjoint matrix of \[323101211\]\\begin{bmatrix} 3 & 2 & 3 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 1 \\end{bmatrix}​312​201​311​​?  
\[Hint: Find the transpose to the cofactor matrix.\]

\[1−1−21−301−12\]\\begin{bmatrix} 1 & -1 & -2 \\\\ 1 & -3 & 0 \\\\ 1 & - 1 & 2 \\end{bmatrix}​111​−1−3−1​−202​​

\[−1111−3120−2\]\\begin{bmatrix} - 1 & 1 & 1 \\\\ 1 & -3 & 1 \\\\ 2 & 0 & -2 \\end{bmatrix}​−112​1−30​11−2​​

\[−1121−3011−2\]\\begin{bmatrix} -1 & 1 & 2 \\\\ 1 & -3 & 0 \\\\ 1 & 1 & -2 \\end{bmatrix}​−111​1−31​20−2​​

\[1−1−2−130−1−12\]\\begin{bmatrix} 1 & -1 & -2 \\\\ -1 & 3 & 0 \\\\ -1 & -1 & 2 \\end{bmatrix}​1−1−1​−13−1​−202​​

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

\[−1121−3011−2\]\\begin{bmatrix} -1 & 1 & 2 \\\\ 1 & -3 & 0 \\\\ 1 & 1 & -2 \\end{bmatrix}​−111​1−31​20−2​​

JavaScript should be enabled to grade this question.

Find out the determinant of \[323101211\]\\begin{bmatrix} 3 & 2 & 3 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 1 \\end{bmatrix}​312​201​311​​.  
\[Hint: Recall the steps to calculate the determinant, given in Key Point 1.\]

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

(Type: Numeric) 2

_1 point_

JavaScript should be enabled to grade this question.

_1 point_

Which of the following is the inverse matrix of \[323101211\]\\begin{bmatrix} 3 & 2 & 3 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 1 \\end{bmatrix}​312​201​311​​?  
 \[Hint: If determinant is non-zero then the inverse of AAA exists and is given by A−1\=1det(A)adj(A)A^{-1}=\\frac{1}{det(A)}adj(A)A−1\=det(A)1​adj(A).\]

12\[1−1−21−301−12\]\\frac{1}{2}\\begin{bmatrix} 1 & -1 & -2 \\\\ 1 & -3 & 0 \\\\ 1 & - 1 & 2 \\end{bmatrix}21​​111​−1−3−1​−202​​

12\[−1111−3120−2\]\\frac{1}{2}\\begin{bmatrix} - 1 & 1 & 1 \\\\ 1 & -3 & 1 \\\\ 2 & 0 & -2 \\end{bmatrix}21​​−112​1−30​11−2​​

12\[−1121−3011−2\]\\frac{1}{2}\\begin{bmatrix} -1 & 1 & 2 \\\\ 1 & -3 & 0 \\\\ 1 & 1 & -2 \\end{bmatrix}21​​−111​1−31​20−2​​

12\[1−1−2−130−1−12\]\\frac{1}{2}\\begin{bmatrix} 1 & -1 & -2 \\\\ -1 & 3 & 0 \\\\ -1 & -1 & 2 \\end{bmatrix}21​​1−1−1​−13−1​−202​​

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

12\[−1121−3011−2\]\\frac{1}{2}\\begin{bmatrix} -1 & 1 & 2 \\\\ 1 & -3 & 0 \\\\ 1 & 1 & -2 \\end{bmatrix}21​​−111​1−31​20−2​​

JavaScript should be enabled to grade this question.

_1 point_

Choose the set of correct options.  
 Hint:   

*    A−1\=1det(A)adj(A)A^{-1}=\\frac{1}{det(A)}adj(A)A−1\=det(A)1​adj(A). 
*    det(A−1)\=1det(A)det(A^{-1})=\\frac{1}{det(A)}det(A−1)\=det(A)1​

If A\=A−1A=A^{-1}A\=A−1, then det(A)det (A)det(A) must be 1.

If A\=A−1A=A^{-1}A\=A−1, then AAA must be the identity matrix.

If A\=A−1A=A^{-1}A\=A−1, then A2\=IA^2=IA2\=I.

If A−1\=adj(A)A^{-1}=adj(A)A−1\=adj(A), then det(A)det(A)det(A) must be 1.

### No, the answer is incorrect.  
Score: 0

### Accepted Answers:

If A\=A−1A=A^{-1}A\=A−1, then A2\=IA^2=IA2\=I.

If A−1\=adj(A)A^{-1}=adj(A)A−1\=adj(A), then det(A)det(A)det(A) must be 1.

  

Check Answers

Your score is: 0/11

Please enable JavaScript to continue using this application.