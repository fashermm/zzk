#include<iostream>
#include<math.h>
using namespace std;
//使用莱布尼茨公式求π的近似值
int main()
{
    double pi = 0.0; double term = 1.0; int sign = 1; int i = 0;

    while (fabs(term) >= 1e-5)
    {
    pi += term;
    sign = -sign;
    i++;
    term = sign / (2.0 * i + 1.0);
    }

    pi *= 4.0;

    printf("π ≈ %.5f\n", pi);
    return 0;
}