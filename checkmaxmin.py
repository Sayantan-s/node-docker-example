num1 = int(input("Enter a number: \n"))
num2 = int(input("Enter a number: \n"))

if num1 > num2 :
    print('{a} greater than {b}'.format(a=num1,b=num2)) 
elif num2 > num1 :
    print('{b} greater than {a}'.format(a=num1,b=num2))
else :
    print('Both are equal!')
