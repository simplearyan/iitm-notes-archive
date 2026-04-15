# Activity Question Lecture 16 - Not Graded _ IITM Online Degree (14_4_2026 3_36_49 pm)

 

    

 
 
 
 
 
 Toss a fair coin three times.

What is the probability of getting two or more than two tails?

Each outcome is equally likely.
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
Experiment: Tossing a coin
Sample space: S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}
Event A: getting two or more than two tails.
=> A = {HTT, THT, TTH, TTT}
P(A) = (no of elements in A) / (no of elements in S)
= 4 / 8 = 1 / 2
### Accepted Answers:
(Type: String) 0.5
 
 
 *
 
 
 1 point
 
 *
 

    

 
 
 
 
 
 Toss a fair coin three times.

What is the probability of getting tail in the first toss?

Each outcome is equally likely.
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
Experiment: Tossing a coin
Sample space: S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}
Event B: getting tail in the first toss.
=> B = {THH, THT, TTH, TTT}
P(B) = (no of elements in B) / (no of elements in S)
= 4 / 8 = 1 / 2
### Accepted Answers:
(Type: String) 0.5
 
 
 *
 
 
 1 point
 
 *
 

**
Key Concepts:**

(Conditional Probability Space Given B)

Sample space: B 
Events: A ⋂ B for every event A in original space
Probability function: P(A ⋂ B) / P(B) 
(denoted P(A | B) and called conditional probability of A given B) 
i.e.

P(A | B) = $\frac{P(A \cap B)}{P(B)}$

    

 
 
 
 
 
 Consider the experiment of tossing a fair coin three times.

Find the probability of getting at least two tails among the three tosses given that the first toss was a tail.

 
 
 
 
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
Event A: getting at least two tails among the three tosses or we can define two or more than two tails among the three tosses.

A = {HTT, THT, TTH, TTT}

Event B: getting tail in the first toss.

B = {THH, THT, TTH, TTT}

A ∩ B = {THT,TTH,TTT}
P(A|B) = P(A ∩ B) / P(B)

            = (3/8) / (1/2)
         
            = 0.75

### Accepted Answers:
(Type: String) 0.75
 
 
 *
 
 
 1 point
 
 *
 

**Key Concepts:**

**Law of total probability**

$P(A) = P(A \cap B) + P(A \cap B^c) = P(A | B) P(B) + P(A | B^c) P(B^c)$

    

 
 
 
 
 
 In a population, 40% are female and 60% are male. Among all the females, 10% are left-handed and among all the males, 12% are left-handed. A person is randomly chosen from the population.

What is the probability that the person is not left-handed?
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
**Step I:** Incorporate all possibilities and write out event

Not Left-handed = (Male and Not Left-handed)

or

(Female and Not Left-handed)

In short, NL = (M and NL) or (F and NL)

**Step II**: Apply the law of total probability for the event

P(not Event) = 1 - P(Event)

P(NL) = P(M) P(NL | M) + P(F) P(NL | F)

= 0.60 x (1 - 0.12) + 0.40 x (1 - 0.10)

= 0.888
### Accepted Answers:
(Type: Range) 0.85,0.91
 
 
 *
 
 
 1 point
 
 *
 

**Key Concepts:
**

A, B: events with P(A) > 0, P(B) > 0

P(A ⋂ B) = P(B) P(A | B) = P(A) P(B | A)

P(B | A) = P(B) P(A | B) / P(A)

    

 
 
 
 
 
 In a population, 40% are female and 60% are male. Among all the females, 10% are left-handed and among all the males 12% are left-handed. A person is randomly chosen from the population.

If the person is left-handed, what is the (conditional) probability that the person is male?
 
 
 
 
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
P(Event1 and Event2) = P(Event1) P(Event2 | Event1) = P(Event2) P(Event1 | Event2)

Question asks for P(Male | Left-handed). Put Event1 = Male (M) and

Event2 = Left-handed (L) in Bayes’ rule.

P(M) P(L | M) = P(L) P(M | L)

P(M) = 0.6, P(L | M) = 0.12, P(L) = ?

P(L) = 1 - P(NL)

= 1 - 0.888 (from previous question)

= 0.112

So, P(M | L) = P(M) P(L | M) / P(L)

= 0.60 x 0.12 / 0.112

= 0.6428

### Accepted Answers:
(Type: Range) 0.62,0.66
 
 
 *
 
 
 1 point
 
 *
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 Suppose we have 3 bags that each contain 200 balls:

- 
Bag 1 has 50 red, 60 blue and 90 green balls

- Bag 2 has 70 red, 80 blue and 50 green balls

- Bag 3 has 65 red, 75 blue and 60 green balls

A bag is selected at random. From that bag a ball is selected at random. 

What is the probability that the chosen ball is green?

 
 
 
 
 
 1/4
 
 
 
 
 
 
 1/3
 
 
 
 
 
 
 1/2
 
 
 
 
 
 
 1/6
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 1/3
 
 
 

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 Suppose we have 3 bags that each contain 200 balls:

- 
Bag 1 has 50 red, 60 blue and 90 green balls

- Bag 2 has 70 red, 80 blue and 50 green balls

- Bag 3 has 65 red, 75 blue and 60 green balls

A bag is selected at random. From that bag a ball is selected at random. 

What is the conditional probability that bag 1 was chosen given that the chosen ball is green?

 
 
 
 
 
 0.25
 
 
 
 
 
 
 0.45
 
 
 
 
 
 
 0.5
 
 
 
 
 
 
 0.33
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 0.45
 
 
 

**Key Concepts:**

**Independence of two events**
 Two events A and B are independent if

 P(A ⋂ B) = P(A) P(B)

 i.e.
When Event 1 and Event 2 are independent, 

P(Event 1 and Event 2) = P(Event 1) P(Event 2)

    

 
 
 
 
 *
 
 
 1 point
 
 *
 
 Roll a ten-sided die. Let A be the event that the outcome is less than 7 and B be the event that the outcome is an even number.

Assume that each outcome is equally likely.

Are A and B independent?
 
 
 
 
 
 Yes
 
 
 
 
 
 
 No
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Accepted Answers:

 Yes
 
 
 

    

 
 
 
 
 
 There are two events such that P(A) = 0.5 and P(B) = 0.3.

Events A and B are independent.

Find P(A ∪ B).

 
 
 
 
 
 
 
 
 
 
 
 
###  No, the answer is incorrect. 
Score: 0

### Feedback:
Event A and B are independent.
And P(A) = 0.5, P(B) = 0.3
=> P(A ⋂ B) = P(A) P(B) = 0.5 * 0.3 = 0.15

P(A ∪ B) = 0.5 + 0.3 - 0.15 = 0.65
### Accepted Answers:
(Type: Numeric) 0.65
 
 
 *
 
 
 1 point
 
 *