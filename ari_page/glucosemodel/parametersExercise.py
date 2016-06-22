__author__ = 'turbosnail9'

V_G = 1.49 # [dL/kg]
k_1 = 0.042 # [min ^-1]
k_2 = 0.071 # [min ^-1]
V_I = 0.04 # [L/kg]
m_1 = 0.379 # [min ^-1]
m_2 = 0.673 # [min ^-1]
m_4 = 0.269 # [min ^-1]
m_5 = 0.0526 # [min *kg/pmol ]
m_6 = 0.8118 # [-]
HE_b = 0.6  # [-]
k_max = 0.0465 # [min ^-1]
k_min = 0.0076 # [min ^-1]
k_abs = 0.023 # [min ^-1]
k_gri = 0.0465 # [min ^-1]
f = 0.90 # [-]
a = 0.00006 # [mg ^-1]
b = 0.68 # [-]
c = 0.00023 # [mg ^-1]
d = 0.09 # [-]
k_p1 = 3.09 # [mg/kg/min ]
k_p2 = 0.0007 # [min ^-1]
k_p3 = 0.005 # [mg/kg/min per pmol/L]
k_p4 = 0.0786 # [mg/kg/min per pmol/kg]
k_i = 0.0066 # [min ^-1]
F_cns = 1 # [mg/kg/min ]
V_m0 = 4.65 # [mg/kg/min ]
V_mx = 0.034 # [mg/kg/min per pmol/L]
K_m0 = 466.21 # [mg/kg]
p_2U = 0.084 # [min ^-1]
K = 0.99 # [pmol/kg per mg/dL]
alpha = 0.013 # [min ^-1]
beta = 0.05 # [pmol/kg/min per mg/dL]
gamma = 0.5 # [min ^-1]
k_e1 = 0.0007 # [min ^-1]
k_e2 = 269 # [mg/kg]
Alpha = 3e-4
Beta = 0.01
Gamma = 1e-7
a_ex = 0.1
T_hr = 5
T_in = 1
T_ex = 600
n = 4

def params():
    p = [V_G ,k_1 ,k_2 , V_I ,m_1 ,m_2 ,m_4 ,m_5 ,m_6 ,HE_b, k_max , k_min , k_abs ,
         k_gri,f,a,b,c,d, k_p1,k_p2, k_p3, k_p4,k_i , F_cns , V_m0,V_mx ,K_m0, p_2U,K,
        alpha,beta, gamma, k_e1, k_e2, Alpha, Beta, Gamma, a_ex, T_hr, T_in, T_ex, n]
    return p