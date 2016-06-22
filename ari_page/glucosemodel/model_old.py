__author__ = 'turbosnail9'
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Created on Thu Apr 24 15:00:48 2014

@author: turbosnail9
"""
# TODO speed up loops

#
# Imports
#
import numpy as np
import math as math
import scipy as sp


class ModelData():
    """Model data array"""
    def __init__(self, body_weight="70", carbs=[], all_times=[],
                 insulin_amount=0):
        """Initialize modelData"""
        self.body_weight = body_weight
        self.carbs = carbs
        self.all_times = all_times
        self.insulin_amount = insulin_amount


    def package(self):
        """Package modelData array"""
        return np.hstack([self.body_weight, self.all_times,self.insulin_amount,
                          self.carbs, 1, 0, 0, 0, 1, 0, 0, 0])

    def display(self):
        """Display modelData params"""
        print("Body Weight =", self.body_weight)
        print("Insulin Amount =", self.insulin_amount)
        print("Carb Amounts =", self.carbs)
        print("Meal Times =", self.all_times)


class PhysiologicalModel():
    """The Dalla-Man Cobelli Model"""

    #
    # Class members
    #

    X = np.zeros((1440, 1))
    t = np.zeros((4, 1))
    x = np.zeros((16, 1))
    u = 0
    meal = 70
    malady = "healthy"
    model_data = []

    def __init__(self, t=[], x=np.zeros((16, 1)), u=0, meal=70, p=[],
                 malady="healthy", model_data=[]):
        """Initializa a new physiological model"""
        self.t = t
        self.x = x
        self.u = u
        self.meal = meal
        self.p = p
        self.malady = malady
        self.model_data = model_data

    def display(self):
        """ Display model input parameters"""
        print self.t
        print self.x
        print self.u
        print self.meal
        print self.p
        print self.malady
        print self.model_data

    def set_model_type(self, malady):
        """Sets the model type if patient is normal/diabetic/exercising"""
        self.malady = malady
        if self.malady == "healthy":
            model_type = self.Cobelli
        elif self.malady == "type1":
            model_type = self.CobelliT1
        elif self.malady == "type2":
            model_type = self.Cobelli
        return model_type

    def CobelliWrap(self, x, u, meal, p, model_data, malady):
        """Steady-state conditions for model"""
        self.x = x
        self.u = u
        self.meal = meal
        self.p = p
        self.model_data = model_data
        self.malady = malady
        if malady == "type1":
            xdot = self.CobelliT1(0, self.x, self.u, self.meal, self.p,
                                self.model_data)
        else:
            xdot = self.Cobelli(0, self.x, self.u, self.meal, self.p,
                                self.model_data)
        return xdot.T[0]

    def Cobelli(self, t, x, u, meal, p, model_data):
        self.t = t
        self.x = x
        self.u = u
        self.meal = meal
        self.p = p
        self.model_data = model_data
        bolus = meal

        BW = self.model_data[0]

        xdot = np.zeros((12,1))

        G_p = self.x[0]
        G_t = self.x[1]
        I_l = self.x[2]
        I_p = self.x[3]
        Q_sto1 = self.x[4]
        Q_sto2 = self.x[5]
        Q_gut = self.x[6]
        I_1 = self.x[7]
        I_d = self.x[8]
        X = self.x[9]
        Y = self.x[10]
        I_po = self.x[11]

        # Constants
        V_G = self.p[0]
        k_1 = self.p[1]
        k_2 = self.p[2]
        V_I = self.p[3]
        m_1 = self.p[4]
        m_2 = self.p[5]
        m_4 = self.p[6]
        m_5 = self.p[7]
        m_6 = self.p[8]
        HE_b = self.p[9]
        k_max = self.p[10]
        k_min = self.p[11]
        k_abs = self.p[12]
        k_gri = self.p[13]
        f = self.p[14]
        a = self.p[15]
        b = self.p[16]
        c = self.p[17]
        d = self.p[18]
        k_p1 = self.p[19]
        k_p2 = self.p[20]
        k_p3 = self.p[21]
        k_p4 = self.p[22]
        k_i = self.p[23]
        F_cns = self.p[24]
        V_m0 = self.p[25]
        V_mx = self.p[26]
        K_m0 = self.p[27]
        p_2U = self.p[28]
        K = self.p[29]
        alpha = self.p[30]
        beta = self.p[31]
        gamma = self.p[32]
        k_e1 = self.p[33]
        k_e2 = self.p[34]

        S = gamma*I_po
        S_b =(m_6 - HE_b)/m_5
        # Insulin basal state
        I_b = 4.4 #basal insulin levels > 60pmol/l is insulin resistant.
        if malady=="healthy" or malady=="type1":
            h = 90
        elif malady=="type2":
            h = 130

        # Certain useful parameters are defined
        HE = -m_5*S + m_6  #0.012243
        m_3 = HE*m_1/(1- HE)
        #GI Tract
        Ra = (f*k_abs*Q_gut)/BW
        Q_sto = Q_sto1 + Q_sto2
        k_emptQ_sto = k_min +((k_max - k_min)/2)*((math.tanh(alpha*(Q_sto -
                        b* bolus)) - math.tanh(c*(Q_sto -d*bolus))+2))
        # Liver
        EGP = sp.maximum(0, k_p1 - k_p2*G_p - k_p3*I_d - k_p4*I_po )  # Change 0 to 2.01 for test

        # Muscle and Adipose Tissue
        V_m = V_m0 + V_mx*X
        K_m = K_m0
        U_id = V_m*G_t/(K_m +G_t)
        # Kidneys - Glucose Renal Excretion
        if(G_p > k_e2):
            E = k_e1*(G_p -k_e2)
        else:
            E = 0

        # Brain - CNS Glucose Utilization
        U_ii = F_cns
        # Mass balances/ differential equations
        xdot[0] = EGP + Ra - U_ii - E - k_1*G_p + k_2*G_t  # dG_p
        xdot[1] = -U_id + k_1*G_p - k_2*G_t  # dG_t
        xdot[2] = -(m_1 +m_3 )*I_l + m_2*I_p + S  #dI_l
        xdot[3] = -(m_2 +m_4 )*I_p + m_1*I_l #+ u #dI_p
        G = G_p/V_G #G(t)
        I = I_p/V_I

        xdot[4] = bolus*d - k_gri*Q_sto1  #dQ_sto1
        xdot[5] = k_gri*Q_sto1 - k_emptQ_sto*Q_sto2  #dQ_sto2
        xdot[6] = k_emptQ_sto*Q_sto2 - k_abs*Q_gut  #dQ_gut
        xdot[7] = -k_i*(I_1 -I) #dI_1
        xdot[8] = -k_i*(I_d -I_1 ) #dI_d
        xdot[9] = p_2U*(I-I_b )-p_2U*X #dX

        if beta*(G-h) >= -S_b:
            xdot[10] = -alpha*(Y-beta*(G-h)) #dY_t
        else:
            xdot[10] = -alpha*(Y+S_b)

        # Pancreas/ Beta -Cell
        if xdot[0]/V_G > 0:
            S_po = Y + S_b + K*(xdot[0]/V_G)
        else:
            S_po = Y + S_b

        xdot[11] = S_po - S #dI_po
        return xdot

    def CobelliT1(self, t, x, u, meal, p, modelData, controlType="PID"):
        #import pidpy as PIDController
        from cgkit.all import PIDController
        self.t = t
        self.x = x
        self.u = u
        self.meal = meal
        self.p = p
        self.model_data = modelData

        D = self.meal
        BW = self.model_data[0]

        xdot = np.zeros((16,1))

        G_p = self.x[0]
        G_t = self.x[1]
        I_l = self.x[2]
        I_p = self.x[3]
        Q_sto1 = self.x[4]
        Q_sto2 = self.x[5]
        Q_gut = self.x[6]
        I_1 = self.x[7]
        I_d = self.x[8]
        X = self.x[9]
        Y = self.x[10]
        I_po = self.x[11]
        G_s = self.x[12]
        G_M = self.x[13]
        I_sc1 = self.x[14]
        I_sc2 = self.x[15]

        # Constants
        V_G = self.p[0]
        k_1 = self.p[1]
        k_2 = self.p[2]
        V_I = self.p[3]
        m_1 = self.p[4]
        m_2 = self.p[5]
        m_4 = self.p[6]
        m_5 = self.p[7]
        m_6 = self.p[8]
        HE_b = self.p[9]
        k_max = self.p[10]
        k_min = self.p[11]
        k_abs = self.p[12]
        k_gri = self.p[13]
        f = self.p[14]
        a = self.p[15]
        b = self.p[16]
        c = self.p[17]
        d = self.p[18]
        k_p1 = self.p[19]
        k_p2 = self.p[20]
        k_p3 = self.p[21]
        k_p4 = self.p[22]
        k_i = self.p[23]
        F_cns = self.p[24]
        V_m0 = self.p[25]
        V_mx = self.p[26]
        K_m0 = self.p[27]
        p_2U = self.p[28]
        K = self.p[29]
        alpha = self.p[30]
        beta = self.p[31]
        gamma = self.p[32]
        k_e1 = self.p[33]
        k_e2 = self.p[34]
        k_d = p[35]
        k_a1 = p[36]
        k_a2 = p[37]
        K_p = p[38]
        T_l = p[39]
        T_d = p[40]
        T_s = p[41]
        k_sc = p[42]
        #------------------------------------------------------------------
        #------------------------------------------------TYPE 1 -------------
        S = gamma*I_po
        S_b =(m_6 - HE_b)/m_5

        G_tar = 130 #mg/dL
        # Insulin basal state
        I_b = 0 #basal insulin levels above 60pmol/l is considered insulin resistant.
        I_pb = 0
        h = 180 # = G_b = 4.4mmol/l
        # Certain useful parameters are defined
        HE = -m_5*S + m_6  #0.012243
        m_3 = HE*m_1/(1- HE)
        #GI Tract

        Ra = (f*k_abs*Q_gut)/BW
        Q_sto = Q_sto1 + Q_sto2
        k_emptQ_sto = k_min +((k_max - k_min)/2)*((math.tanh(a*(Q_sto -b* D)) - math.tanh(c*(Q_sto -d*D))+2))
        # Liver
        EGP = sp.maximum(2.4, k_p1 - k_p2*G_p - k_p3*I_d - k_p4*I_po )# Change 0 to 2.01 for test

        # Muscle and Adipose Tissue
        V_m = V_m0 + V_mx*X
        K_m = K_m0
        U_id = V_m*G_t/(K_m +G_t)
        # Kidneys - Glucose Renal Excretion
        if(G_p > k_e2):
            E = k_e1*(G_p -k_e2)
        else:
            E = 0

        # Brain - CNS Glucose Utilization
        U_ii = F_cns
        # Mass balances/ differential equations
        xdot[13] = -k_sc*G_M + k_sc*(G_p/V_G) #dG_M
        G = G_M
        xdot[12] = -1/T_s*G_s + 1/T_s*G
        xdot[0] = EGP + Ra - U_ii - E - k_1*G_p + k_2*G_t  # dG_p
        xdot[1] = -U_id + k_1*G_s - k_2*G_t  # dG_t

        # Select which controller to use based on input arguments
        if controlType == "PID":
            PIDController.input_slot = G_s
            p = PIDController(name = "PIDController", setpoint = G_tar, Kp = K_p, Ki = K_p/T_l, Kd =  K_p*T_d, maxout = 250, minout = 60, auto_insert = True)

            IIR = p.output_slot._value
        else:
            IIR = 0

        I_sc1ss = (I_pb*(m_2+m_4-((m_1*m_2)/(m_1+m_3))))/(k_d+k_a1)
        I_sc2ss = (k_d/k_a2)*I_sc1ss

        xdot[14] = sp.minimum(I_sc1ss,(-(k_d+k_a1)*I_sc1 + IIR))
        xdot[15] = sp.minimum(I_sc2ss,(k_d*I_sc1 - k_a2*I_sc2))

        xdot[2] = -(m_1 +m_3 )*I_l + m_2*I_p + S #dI_l
        xdot[3] = -(m_2+m_4)*I_p + m_1*I_l + k_a1*I_sc1 + k_a2*I_sc2
        I = I_p/V_I
        xdot[5] = k_gri*Q_sto1 - k_emptQ_sto*Q_sto2  #dQ_sto2
        xdot[6] = k_emptQ_sto*Q_sto2 - k_abs*Q_gut  #dQ_gut
        xdot[7] = -k_i*(I_1 -I) #dI_1
        xdot[8] = -k_i*(I_d -I_1 ) #dI_d
        xdot[9] = p_2U*(I-I_b )-p_2U*X #dX

        if(beta*(G-h) >= -S_b):
            xdot[10] = -alpha*(Y-beta*(G-h)) #dY_t
        else:
            xdot[10] = -alpha*(Y+S_b)

        # Pancreas/ Beta -Cell
        if(xdot[0]/V_G > 0):
            S_po = Y + S_b + K*(xdot[0]/V_G)
        else:
            S_po = Y + S_b

        xdot[11] = S_po - S #dI_po

        return xdot
    #
    # If run as a script, create a test object
    #

    def RunSimulation(self, t, x, u, p, modelType, modelData, malady):
        from scipy.optimize import fsolve as solver
        from scipy.integrate import ode
        self.t = t
        self.x = x
        self.u = u
        self.modelType = modelType
        self.p = p
        self.model_data = modelData
        self.malady = malady

        breakfast_carbpermin = self.model_data[8]
        lunch_carbpermin = self.model_data[9]
        dinner_carbpermin = self.model_data[10]

        insulin = self.u

        G_p = []
        G_t = []
        I_l = []
        I_p = []
        Q_sto1 = []
        Q_sto2 = []
        Q_gut = []
        I_1 = []
        I_d = []
        X = []
        Y = []
        I_po = []
        if malady == "type1":
            G_s = []
            G_M = []
            I_sc1 = []
            I_sc2 = []

        # State vector for training Neural Network
        if malady == "type1":
            stateVector = [G_p, G_t, I_l, I_p, Q_sto1,
                           Q_sto2, Q_gut, I_1, I_d, X,
                           Y, I_po, G_s, G_M, I_sc1, I_sc2]
        else:
            stateVector = [G_p, G_t, I_l, I_p, Q_sto1, Q_sto2, Q_gut, I_1,
                       I_d, X, Y, I_po]


        # (xStart,u,0,p,modelData)
        xInitial0 = solver(self.CobelliWrap,x,
                           args=(u,0,p,modelData,malady))

        #Initialize empty meal vector
        mealVector = []
        mealVectorAppend = mealVector.append
        stateVector_0_Append = stateVector[0].append
        stateVector_1_Append = stateVector[1].append
        stateVector_2_Append = stateVector[2].append
        stateVector_3_Append = stateVector[3].append
        stateVector_4_Append = stateVector[4].append
        stateVector_5_Append = stateVector[5].append
        stateVector_6_Append = stateVector[6].append
        stateVector_7_Append = stateVector[7].append
        stateVector_8_Append = stateVector[8].append
        stateVector_9_Append = stateVector[9].append
        stateVector_10_Append = stateVector[10].append
        stateVector_11_Append = stateVector[11].append

        # Midnight to first insulin shot
        r = ode(modelType).set_integrator('vode', method='bdf',
            order=15).set_initial_value(xInitial0,
            t[0]).set_f_params(self.u , 0, self.p, self.model_data)
        while r.successful() and r.t < t[1]:
            r.integrate(r.t+1)
            mealVectorAppend(r.f_params[1])
            stateVector_0_Append(r.y[0])
            stateVector_1_Append(r.y[1])
            stateVector_2_Append(r.y[2])
            stateVector_3_Append(r.y[3])
            stateVector_4_Append(r.y[4])
            stateVector_5_Append(r.y[5])
            stateVector_6_Append(r.y[6])
            stateVector_7_Append(r.y[7])
            stateVector_8_Append(r.y[8])
            stateVector_9_Append(r.y[9])
            stateVector_10_Append(r.y[10])
            stateVector_11_Append(r.y[11])
            if malady == "type1":
                stateVector[12].append(r.y[12])
                stateVector[13].append(r.y[13])
                stateVector[14].append(r.y[14])
                stateVector[15].append(r.y[15])

        # Insulin shot before breakfast
        xInitial1 = r.y.T
        xInitial1[1] = xInitial1[1] + insulin
        r1 = ode(modelType).set_integrator('vode', method='bdf',
                order=15).set_initial_value(xInitial1,
                t[1]).set_f_params(self.u , 0, self.p, self.model_data)
        while r1.successful() and r1.t < t[2]:
            r1.integrate(r1.t+1)
            mealVectorAppend(r1.f_params[1])
            stateVector_0_Append(r1.y[0])
            stateVector_1_Append(r1.y[1])
            stateVector_2_Append(r1.y[2])
            stateVector_3_Append(r1.y[3])
            stateVector_4_Append(r1.y[4])
            stateVector_5_Append(r1.y[5])
            stateVector_6_Append(r1.y[6])
            stateVector_7_Append(r1.y[7])
            stateVector_8_Append(r1.y[8])
            stateVector_9_Append(r1.y[9])
            stateVector_10_Append(r1.y[10])
            stateVector_11_Append(r1.y[11])
            if malady == "type1":
                stateVector[12].append(r1.y[12])
                stateVector[13].append(r1.y[13])
                stateVector[14].append(r1.y[14])
                stateVector[15].append(r1.y[15])

        # Breakfast start
        xInitial2 = r1.y.T

        r2 = ode(modelType).set_integrator('vode', method='bdf',
                order=15).set_initial_value(xInitial2,
                t[2]).set_f_params(u, breakfast_carbpermin, p, modelData)
        while r2.successful() and r2.t < t[3]:
            r2.integrate(r2.t+1)
            mealVectorAppend(r2.f_params[1])
            stateVector_0_Append(r2.y[0])
            stateVector_1_Append(r2.y[1])
            stateVector_2_Append(r2.y[2])
            stateVector_3_Append(r2.y[3])
            stateVector_4_Append(r2.y[4])
            stateVector_5_Append(r2.y[5])
            stateVector_6_Append(r2.y[6])
            stateVector_7_Append(r2.y[7])
            stateVector_8_Append(r2.y[8])
            stateVector_9_Append(r2.y[9])
            stateVector_10_Append(r2.y[10])
            stateVector_11_Append(r2.y[11])
            if malady == "type1":
                stateVector[12].append(r2.y[12])
                stateVector[13].append(r2.y[13])
                stateVector[14].append(r2.y[14])
                stateVector[15].append(r2.y[15])

        # Breakfast stop
        xInitial3 = r2.y.T
        r3 = ode(self.modelType).set_integrator('vode', method='bdf',
                order=15).set_initial_value(xInitial3,
                t[3]).set_f_params(self.u, 0, self.p, self.model_data)
        while r3.successful() and r3.t < t[4]:
            r3.integrate(r3.t+1)
            mealVectorAppend(r3.f_params[1])
            stateVector_0_Append(r3.y[0])
            stateVector_1_Append(r3.y[1])
            stateVector_2_Append(r3.y[2])
            stateVector_3_Append(r3.y[3])
            stateVector_4_Append(r3.y[4])
            stateVector_5_Append(r3.y[5])
            stateVector_6_Append(r3.y[6])
            stateVector_7_Append(r3.y[7])
            stateVector_8_Append(r3.y[8])
            stateVector_9_Append(r3.y[9])
            stateVector_10_Append(r3.y[10])
            stateVector_11_Append(r3.y[11])
            if malady == "type1":
                stateVector[12].append(r3.y[12])
                stateVector[13].append(r3.y[13])
                stateVector[14].append(r3.y[14])
                stateVector[15].append(r3.y[15])

        # Insulin shot before lunch
        xInitial4 = r3.y.T
        r4 = ode(self.modelType).set_integrator('vode', method='bdf',
                order=15).set_initial_value(xInitial4,
                t[4]).set_f_params(self.u, 0, self.p, self.model_data)
        while r4.successful() and r4.t < t[5]:
            r4.integrate(r4.t+1)
            mealVectorAppend(r4.f_params[1])
            stateVector_0_Append(r4.y[0])
            stateVector_1_Append(r4.y[1])
            stateVector_2_Append(r4.y[2])
            stateVector_3_Append(r4.y[3])
            stateVector_4_Append(r4.y[4])
            stateVector_5_Append(r4.y[5])
            stateVector_6_Append(r4.y[6])
            stateVector_7_Append(r4.y[7])
            stateVector_8_Append(r4.y[8])
            stateVector_9_Append(r4.y[9])
            stateVector_10_Append(r4.y[10])
            stateVector_11_Append(r4.y[11])
            if malady == "type1":
                stateVector[12].append(r4.y[12])
                stateVector[13].append(r4.y[13])
                stateVector[14].append(r4.y[14])
                stateVector[15].append(r4.y[15])

        # Lunch start
        xInitial5 = r4.y.T

        r5 = ode(modelType).set_integrator('vode', method='bdf',
                order=15).set_initial_value(xInitial5,
                t[5]).set_f_params(u,lunch_carbpermin,p,modelData)
        while r5.successful() and r5.t < t[6]:
            r5.integrate(r5.t+1)
            mealVectorAppend(r5.f_params[1])
            stateVector_0_Append(r5.y[0])
            stateVector_1_Append(r5.y[1])
            stateVector_2_Append(r5.y[2])
            stateVector_3_Append(r5.y[3])
            stateVector_4_Append(r5.y[4])
            stateVector_5_Append(r5.y[5])
            stateVector_6_Append(r5.y[6])
            stateVector_7_Append(r5.y[7])
            stateVector_8_Append(r5.y[8])
            stateVector_9_Append(r5.y[9])
            stateVector_10_Append(r5.y[10])
            stateVector_11_Append(r5.y[11])
            if malady == "type1":
                stateVector[12].append(r5.y[12])
                stateVector[13].append(r5.y[13])
                stateVector[14].append(r5.y[14])
                stateVector[15].append(r5.y[15])

        # Lunch stop
        xInitial6 = r5.y.T
        r6 = ode(self.modelType).set_integrator('vode', method='bdf',
                order=15).set_initial_value(xInitial6,
                t[6]).set_f_params(self.u, 0, self.p, self.model_data)
        while r6.successful() and r6.t < t[7]:
            r6.integrate(r6.t+1)
            mealVectorAppend(r6.f_params[1])
            stateVector_0_Append(r6.y[0])
            stateVector_1_Append(r6.y[1])
            stateVector_2_Append(r6.y[2])
            stateVector_3_Append(r6.y[3])
            stateVector_4_Append(r6.y[4])
            stateVector_5_Append(r6.y[5])
            stateVector_6_Append(r6.y[6])
            stateVector_7_Append(r6.y[7])
            stateVector_8_Append(r6.y[8])
            stateVector_9_Append(r6.y[9])
            stateVector_10_Append(r6.y[10])
            stateVector_11_Append(r6.y[11])
            if malady == "type1":
                stateVector[12].append(r6.y[12])
                stateVector[13].append(r6.y[13])
                stateVector[14].append(r6.y[14])
                stateVector[15].append(r6.y[15])

        # Insulin shot before dinner
        xInitial7 = r6.y.T
        r7 = ode(self.modelType).set_integrator('vode', method='bdf',
                order=15).set_initial_value(xInitial7,
                t[7]).set_f_params(self.u, 0, self.p, self.model_data)
        while r7.successful() and r7.t < t[8]:
            r7.integrate(r7.t+1)
            mealVectorAppend(r7.f_params[1])
            stateVector_0_Append(r7.y[0])
            stateVector_1_Append(r7.y[1])
            stateVector_2_Append(r7.y[2])
            stateVector_3_Append(r7.y[3])
            stateVector_4_Append(r7.y[4])
            stateVector_5_Append(r7.y[5])
            stateVector_6_Append(r7.y[6])
            stateVector_7_Append(r7.y[7])
            stateVector_8_Append(r7.y[8])
            stateVector_9_Append(r7.y[9])
            stateVector_10_Append(r7.y[10])
            stateVector_11_Append(r7.y[11])
            if malady == "type1":
                stateVector[12].append(r7.y[12])
                stateVector[13].append(r7.y[13])
                stateVector[14].append(r7.y[14])
                stateVector[15].append(r7.y[15])

        # Dinner start
        xInitial8 = r7.y.T

        r8 = ode(modelType).set_integrator('vode', method='bdf',
                order=15).set_initial_value(xInitial8,
                t[8]).set_f_params(u,dinner_carbpermin,p,modelData)
        while r8.successful() and r8.t < t[9]:
            r8.integrate(r8.t+1)
            mealVectorAppend(r8.f_params[1])
            stateVector_0_Append(r8.y[0])
            stateVector_1_Append(r8.y[1])
            stateVector_2_Append(r8.y[2])
            stateVector_3_Append(r8.y[3])
            stateVector_4_Append(r8.y[4])
            stateVector_5_Append(r8.y[5])
            stateVector_6_Append(r8.y[6])
            stateVector_7_Append(r8.y[7])
            stateVector_8_Append(r8.y[8])
            stateVector_9_Append(r8.y[9])
            stateVector_10_Append(r8.y[10])
            stateVector_11_Append(r8.y[11])
            if malady == "type1":
                stateVector[12].append(r8.y[12])
                stateVector[13].append(r8.y[13])
                stateVector[14].append(r8.y[14])
                stateVector[15].append(r8.y[15])

        # Dinner stop
        xInitial9 = r8.y.T
        r9 = ode(self.modelType).set_integrator('vode', method='bdf',
                order=15).set_initial_value(xInitial9,
                t[9]).set_f_params(self.u, 0, self.p, self.model_data)
        while r9.successful() and r9.t < t[10]:
            r9.integrate(r9.t+1)
            mealVectorAppend(r9.f_params[1])
            stateVector_0_Append(r9.y[0])
            stateVector_1_Append(r9.y[1])
            stateVector_2_Append(r9.y[2])
            stateVector_3_Append(r9.y[3])
            stateVector_4_Append(r9.y[4])
            stateVector_5_Append(r9.y[5])
            stateVector_6_Append(r9.y[6])
            stateVector_7_Append(r9.y[7])
            stateVector_8_Append(r9.y[8])
            stateVector_9_Append(r9.y[9])
            stateVector_10_Append(r9.y[10])
            stateVector_11_Append(r9.y[11])
            if malady == "type1":
                stateVector[12].append(r9.y[12])
                stateVector[13].append(r9.y[13])
                stateVector[14].append(r9.y[14])
                stateVector[15].append(r9.y[15])

        #Convert stateVector into a NumPy Array
        outputArray = np.array(stateVector)

        # Collects all the simulated intervals
        outputArray[0] = [x / self.p[0] for x in outputArray[0]]
        return {'outputArray': outputArray,'mealVector':  mealVector}


def generate_data(mealVector, weight, runModel, filename, dt, end, malady=None):
    import csv
    ROWS = 1440
    print "Generating data into %s" % filename
    fileHandle = open(filename,"w")
    writer = csv.writer(fileHandle)
    # writer.writerow(["G_p", "bolus", "G_t", "I_l", "I_p", "Q_sto1", "Q_sto2", "Q_gut",
    #                   "I_1", "I_d", "X", "Y", "I_po"])
    # writer.writerow(["float", "float", "float","float", "float", "float",
    #              "float", "float", "float", "float", "float", "float","float"])
    # writer.writerow([",,,,,,,,,,,,"])

    import datetime

    step = datetime.timedelta(minutes=1)

    result = []

    while dt < end:
        result.append(dt.strftime('%Y-%m-%d %H:%M:%S'))
        dt += step
    for i in range(ROWS):
        time = result[i]
        bolus = mealVector[i]/1801.8
        G_p = runModel[0][i]
        G_t = runModel[1][i]
        I_l = runModel[2][i]
        I_p = runModel[3][i]
        Q_sto1 = runModel[4][i]
        Q_sto2 = runModel[5][i]
        Q_gut = runModel[6][i]
        I_1 = runModel[7][i]
        I_d = runModel[8][i]
        X = runModel[9][i]
        Y = runModel[10][i]
        I_po = runModel[11][i]

        Ra = (0.9*0.057*Q_gut)/weight
        writer.writerow([bolus, weight, G_p, I_p, Ra])
                         #G_t, I_l, I_p,
                         #Q_sto1, Q_sto2, Q_gut, I_1, I_d, X, Y, I_po])

    fileHandle.close()
    print "Generated %i rows of output data into %s" % (ROWS, filename)


if __name__ == "__main__":
    from random import randint
    import meal
    import patient
    import datetime

    numDays = 50
    dt = datetime.datetime.today()
    for i in range(numDays):
        dt = dt + datetime.timedelta(days=numDays)
        end = dt + datetime.timedelta(days=numDays+1)
        #Create a patient
        #weight = randint(60,80)
        weight = np.linspace(60,80,numDays)
        age = randint(18,65)
        bob = patient.Patient(name="bob",age = age, body_weight = weight[i], malady ="type2")
        malady = bob.get_malady()
        print "Creating a patient named %s who is %s and weighs %s kgs" %(bob.get_name(),bob.get_malady(),bob.get_body_weight())

        #Create a meal
        meals = []

        breakfast = meal.Meal(hour=randint(6,10), minute=randint(0,59), carb_amount= randint(20,200))
        setEatingTime = breakfast.set_duration(30)
        setInsulinTime = breakfast.set_insulin_time(15)
        eatingTime = breakfast.get_duration()
        meals.append(100*breakfast.get_carb_input()*18.018)
        print "Creating a meal of %s carbs" %breakfast.get_carb_input()

        #Create a meal
        lunch = meal.Meal(hour=randint(11,15), minute=randint(0,59), carb_amount= randint(80,300))
        setEatingTime = lunch.set_duration(30)
        setInsulinTime = lunch.set_insulin_time(15)
        eatingTime = lunch.get_duration()
        meals.append(100*lunch.get_carb_input()*18.018)
        print "Creating a meal of %s carbs" %lunch.get_carb_input()

        #Create a meal
        dinner = meal.Meal(hour=randint(16,19), minute=randint(0,59), carb_amount= randint(50,300))
        setEatingTime = dinner.set_duration(30)
        setInsulinTime = dinner.set_insulin_time(15)
        eatingTime = dinner.get_duration()
        meals.append(100*dinner.get_carb_input()*18.018)
        print "Creating a meal of %s carbs" %dinner.get_carb_input()

        #Input params for simulation
        t = np.hstack([0,np.array(breakfast.get_all_times()), np.array(lunch.get_all_times()),np.array(dinner.get_all_times()),1440])
        print "Setting up time vector of length %s" %t.max()

        u = 0.0954119*bob.get_body_weight()

        if malady == "type1":
            x  = [130, 130, 54.18, 54.18, 0, 0, 0,
                          4.4, 4.4, 0, 0, 130, 130, 0, 0, 0]
        else:
            x  = [90, 90, 54.18, 54.18, 0,
                          0, 0, 4.4, 4.4, 0, 0, 0]

        # Set model parameters
        p = bob.set_parameters(bob.get_malady()).params()

        model_data = np.array([bob.get_body_weight(), breakfast.get_start_time()[0],
                              breakfast.get_start_time()[1],lunch.get_start_time()[0],
                              lunch.get_start_time()[1],dinner.get_start_time()[0],
                              dinner.get_start_time()[1],
                              eatingTime, meals[0]/eatingTime,
                              meals[1]/eatingTime, meals[2]/eatingTime,
                                2000, 1, 0, 0, 0, 1, 0, 0, 0])

        newModel = PhysiologicalModel(t, x, u, meals, p,
                                      bob.get_malady(), model_data)

        modelType = newModel.set_model_type(bob.get_malady())


        runModel = newModel.RunSimulation( t, x, u, p, modelType, model_data, malady)['outputArray']
        mealVector = newModel.RunSimulation( t, x, u, p, modelType, model_data, malady)['mealVector']

        #Write data to file
        generate_data(mealVector, weight[i], runModel,'data/data_%s_%i.csv' % (malady,i),dt, end, malady = bob.get_malady())

        #plot_everything.PlotEverything(runModel)