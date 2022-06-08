def expectedWin(RatingA, RatingB):
    expected = 1/(1+pow(10, (RatingB-RatingA)/400)) 
    return expected

def newRating(RatingA, ExpectedA, ScoreA, K = 100):
    newR = RatingA + K*(ScoreA- ExpectedA)
    return newR

def match(RatingA, RatingB, AWin):
    newA = newRating(RatingA, expectedWin(RatingA, RatingB), AWin)
    newB = RatingA + RatingB - newA
    RatingB = newB
    RatingA = newA
    return RatingA,RatingB


Ra = 1000
Rb = 1000

Ra,Rb = match(Ra, Rb, 1)


print(Ra, Rb)