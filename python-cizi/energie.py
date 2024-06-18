from random import randint
import math
import matplotlib.pyplot as plt
import numpy as np

iterations = 2000000
list_l = 100
list_energii = np.array([])
list_energii_ = []
T=5
#list = [[randint(0, 1) for i in range(list_l)] for j in range(list_l)]
list = [[0 for i in range(list_l)] for j in range(list_l)]
def pi(E, T):
    return math.exp(-E/T)

energie = 0
for i in range(len(list)):
    for j in range(len(list[i])):
        if list[i][j] != list[i][(j+1)%list_l]:
            energie+=1
        if list[i][j] != list[(i+1)%list_l][j]:
            energie+=1

for h in range(iterations):
    if h%100000==0:
        print(h)
    l_i = randint(0, list_l-1)
    l_j = randint(0,list_l-1)
    a = (list[l_i][l_j]+1)%2

    k = 0
    for i in [-1,1]:
        if a == list[(l_i+i)%list_l][(l_j)%list_l]:
            k-=1
        else:
            k+=1
        if a == list[(l_i)%list_l][(l_j+i)%list_l]:
            k-=1
        else:
            k+=1

    #if randint(0, 100000)/100000 <= pi(energie + k, T)/pi(energie, T):
    if randint(0, 100000)/100000 <= pi(k, T):
            list[l_i][l_j] = a
            energie += k
            #print(energie)
            #list_energii=np.append(list_energii, energie)
            list_energii_.append(energie)

x = np.linspace(0,iterations, num=len(list_energii_))
y = np.array(list_energii_)
print(x,y)
fig, ax = plt.subplots()
ax.plot(x, y, linewidth=2.0)
print(np.mean(y))
plt.xlabel("Number of iterations")
plt.ylabel("Energy")
plt.show()
plt(list_energii)
