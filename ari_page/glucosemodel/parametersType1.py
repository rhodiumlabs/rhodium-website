# -*- coding: utf-8 -*-
"""
Created on Wed Apr 30 17:42:45 2014

@author: admin
"""

V_G = 1.88 #1.49 # [dL/kg]
k_1 = 0.065 #0.042 # [min ^-1]
k_2 = 0.079 #0.071 # [min ^-1]
V_I = 0.05 #0.04 # [L/kg]
m_1 = 0.190 #0.379 # [min ^-1]
m_2 = 0.484 #0.673 # [min ^-1]
m_4 = 0.194 #0.269 # [min ^-1]
m_5 = 0.0304 #0.0526 # [min *kg/pmol ]
m_6 = 0.6471 #0.8118 # [-]
HE_b = 0.6  # [-]
k_max = 0.0558 #0.0465 # [min ^-1]
k_min = 0.0080 #0.0076 # [min ^-1]
k_abs = 0.057 #0.023 # [min ^-1]
k_gri = 0.0558 #0.0465 # [min ^-1]
f = 0.90 # [-]
a = 0.00013 #0.00006 # [mg ^-1]
b = 0.82 #0.68 # [-]
c = 0.00236 #0.00023 # [mg ^-1]
d = 0.010 # 0.09 # [-]
k_p1 = 2.70 #3.09 # [mg/kg/min ]
k_p2 = 0.0021 #0.0007 # [min ^-1]
k_p3 = 0.009 #0.005 # [mg/kg/min per pmol/L]
k_p4 = 0.0618 #0.0786 # [mg/kg/min per pmol/kg]
k_i = 0.0079 #0.0066 # [min ^-1]
F_cns = 1 # [mg/kg/min ]
V_m0 = 2.50 #4.65 # [mg/kg/min ]
V_mx = 0.047 #0.034 # [mg/kg/min per pmol/L]
K_m0 = 225.59 #466.21 # [mg/kg]
p_2U = .0331 #0.084 # [min ^-1]
K = 2.30 #0.99 # [pmol/kg per mg/dL]
alpha = 0.050 #0.013 # [min ^-1]
beta = 0.11 #0.05 # [pmol/kg/min per mg/dL]
gamma = 0.5 # [min ^-1]
k_e1 = 0.0005 #0.0007 # [min ^-1]
k_e2 = 339 #269 # [mg/kg]
k_d = 0.0164 #min^-1 
k_a1 = 0.0018 #min^-1
k_a2 = 0.0182 #min^-1
K_p = 0.032 #pmol/kg/min per mg/dl
T_l = 450 #min
T_d = 66 #min
T_s = 10 #min
k_sc = 1 #rate parameter for subcutaneous glucose kinetics

def params():
    p = [V_G ,k_1 ,k_2 , V_I ,m_1 ,m_2 ,m_4 ,m_5 ,m_6 ,HE_b, k_max , k_min , k_abs ,
         k_gri,f,a,b,c,d, k_p1,k_p2, k_p3, k_p4,k_i , F_cns , V_m0,V_mx ,K_m0, p_2U,K,
        alpha,beta, gamma, k_e1, k_e2, k_d, k_a1, k_a2, K_p, T_l, T_d, T_s, k_sc]
    return p