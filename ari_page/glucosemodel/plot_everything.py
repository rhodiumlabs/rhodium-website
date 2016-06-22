__author__ = 'turbosnail9'
import plotly.plotly as py
from plotly.graph_objs import *
#Plotly sign in
py.sign_in("turbosnail9", "ipqsdfgf9l")

def PlotEverything(runModel):
    timeAxis = range(1440)

    trace0 = Scatter(
    x= timeAxis,
    y= runModel[0],
    name='G_p'

    )
    trace1 = Scatter(
        x= timeAxis,
        y= runModel[1],
        name='G_t',
        xaxis='x2',
        yaxis='y2'
    )
    trace2 = Scatter(
        x= timeAxis,
        y= runModel[2],
        name='I_l',
        xaxis='x3',
        yaxis='y3'
    )
    trace3 = Scatter(
        x= timeAxis,
        y= runModel[3],
        name='I_p',
        xaxis='x4',
        yaxis='y4'
    )
    trace4 = Scatter(
        x= timeAxis,
        y= runModel[4],
        name='Q_sto1',
        xaxis='x5',
        yaxis='y5'
    )
    trace5 = Scatter(
        x= timeAxis,
        y= runModel[5],
        name='Q_sto2',
        xaxis='x6',
        yaxis='y6'
    )
    trace6 = Scatter(
        x= timeAxis,
        y= runModel[6],
        name='Q_gut',
        xaxis='x7',
        yaxis='y7'
    )
    trace7 = Scatter(
        x= timeAxis,
        y= runModel[7],
        name='I_1',
        xaxis='x8',
        yaxis='y8'
    )
    trace8 = Scatter(
        x= timeAxis,
        y= runModel[8],
        name='I_d',
        xaxis='x9',
        yaxis='y9'
    )
    trace9 = Scatter(
        x= timeAxis,
        y= runModel[9],
        name='X',
        xaxis='x10',
        yaxis='y10'
    )
    trace10 = Scatter(
        x= timeAxis,
        y= runModel[10],
        name='Y',
        xaxis='x11',
        yaxis='y11'
    )
    trace11 = Scatter(
        x= timeAxis,
        y= runModel[11],
        name='I_po',
        xaxis='x12',
        yaxis='y12'
    )
    data = Data([trace0, trace1, trace2, trace3, trace4, trace5, trace6,
                trace7, trace8, trace9, trace10, trace11])

    layout = Layout(
    title='Physiological Model Parameters',
    xaxis=XAxis(
        domain=[0, 0.45]
    ),
    yaxis=YAxis(
        domain=[0, 0.15]
    ),
    xaxis2=XAxis(
        domain=[0.55, 1]
    ),
    xaxis3=XAxis(
        domain=[0, 0.45],
        anchor='y3'
    ),
    xaxis4=XAxis(
        domain=[0.55, 1],
        anchor='y4'
    ),
    xaxis5=XAxis(
        domain=[0, 0.45],
        anchor='y5'
    ),
    xaxis6=XAxis(
        domain=[0.55, 1],
        anchor='y6'
    ),
    xaxis7=XAxis(
        domain=[0, 0.45],
        anchor='y7'
    ),
    xaxis8=XAxis(
        domain=[0.55, 1],
        anchor='y8'
    ),
    xaxis9=XAxis(
        domain=[0, 0.45],
        anchor='y9'
    ),
    xaxis10=XAxis(
        domain=[0.55, 1],
        anchor='y10'
    ),
    xaxis11=XAxis(
        domain=[0, 0.45],
        anchor='y11'
    ),
    xaxis12=XAxis(
        domain=[0.55, 1],
        anchor='y12'
    ),
    yaxis2=YAxis(
        domain=[0, 0.15],
        anchor='x2'
    ),
    yaxis3=YAxis(
        domain=[0.17, 0.32]
    ),
    yaxis4=YAxis(
        domain=[0.17, 0.32],
        anchor='x4'
    ),
    yaxis5=YAxis(
        domain=[0.34, 0.49],
    ),
    yaxis6=YAxis(
        domain=[0.34, 0.49],
        anchor='x6'
    ),
    yaxis7=YAxis(
        domain=[0.51, 0.66],
    ),
    yaxis8=YAxis(
        domain=[0.51, 0.66],
        anchor='x8'
    ),
    yaxis9=YAxis(
        domain=[0.68, 0.83],
    ),
    yaxis10=YAxis(
        domain=[0.68, 0.83],
        anchor='x10'
    ),
    yaxis11=YAxis(
        domain=[0.85, 1],
    ),
    yaxis12=YAxis(
        domain=[0.85, 1],
        anchor='x12'
    )
    )
    fig = Figure(data=data, layout=layout)

    unique_url = py.plot(fig, filename = 'Healthy Subject Simulation')

if __name__ == '__main__':
    plot_object = PlotEverything()
    print plot_object