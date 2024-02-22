/**
 * Asset details and their canvas coordinates for Single Line Diagram
 */
export const SldData = [
    //POI
    {
        type: "bus",
        name: "bus1",
        startX: 985,
        startY: 25,
        endX: 985,
        endY: 50
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 973,
        imgPosY: 50,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 923,
        namePosY: 50
    },
    {
        type: "bus",
        name: "bus2",
        startX: 985,
        startY: 75,
        endX: 985,
        endY: 83
    },
    {
        type: "device",
        image: "poi",
        imgPosX: 967,
        imgPosY: 82,
        imgWidth: 35,
        imgHeight: 50,
        showName: true,
        name: "POI",
        namePosX: 923,
        namePosY: 60,
        measurements: [
            {
                name: "P",
                namePosX: 860,
                namePosY: 90
            },
            {
                name: "Q",
                namePosX: 860,
                namePosY: 110
            },
            {
                name: "V",
                namePosX: 1010,
                namePosY: 60
            },
            {
                name: "I",
                namePosX: 1010,
                namePosY: 80
            },
            {
                name: "F",
                namePosX: 1010,
                namePosY: 100
            },
            {
                name: "PF",
                namePosX: 1010,
                namePosY: 120
            },
            {
                name: "MeasQual",
                namePosX: 1010,
                namePosY: 140
            }
        ]
    },
    //Connection Bus for POI & Inverters
    {
        type: "bus",
        name: "connector1",
        startX: 985,
        startY: 130,
        endX: 985,
        endY: 215
    },
    //Connection Bus for Communication Details
    {
        type: "bus",
        name: "connector2",
        startX: 825,
        startY: 150,
        endX: 985,
        endY: 150
    },
    //Communication Details
    {
        type: "device",
        image: "block",
        imgPosX: 90,
        imgPosY: 80,
        imgWidth: 230,
        imgHeight: 90,
        showName: false,
        name: "block1",
        namePosX: 140,
        namePosY: 60,
        measurements: [
            {
                name: "Active Mode",
                namePosX: 100,
                namePosY: 110
            },
            {
                name: "POI P Setpoint",
                namePosX: 100,
                namePosY: 130
            },
            {
                name: "POI Q Setpoint",
                namePosX: 100,
                namePosY: 150
            }
        ]
    },
    //Communication Status
    {
        type: "device",
        image: "block",
        imgPosX: 325,
        imgPosY: 80,
        imgWidth: 500,
        imgHeight: 90,
        showName: true,
        name: "Communication Status",
        namePosX: 410,
        namePosY: 98
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 360,
        imgPosY: 105,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 1",
        namePosX: 380,
        namePosY: 117
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 360,
        imgPosY: 125,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 2",
        namePosX: 380,
        namePosY: 137
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 360,
        imgPosY: 145,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 3",
        namePosX: 380,
        namePosY: 157
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 460,
        imgPosY: 105,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 4",
        namePosX: 480,
        namePosY: 117
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 460,
        imgPosY: 125,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 5",
        namePosX: 480,
        namePosY: 137
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 460,
        imgPosY: 145,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 6",
        namePosX: 480,
        namePosY: 157
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 560,
        imgPosY: 105,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 7",
        namePosX: 580,
        namePosY: 117
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 560,
        imgPosY: 125,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 8",
        namePosX: 580,
        namePosY: 137
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 710,
        imgPosY: 105,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "SCADA",
        namePosX: 740,
        namePosY: 117
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 710,
        imgPosY: 125,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "PQM Meter",
        namePosX: 740,
        namePosY: 137
    },
    //Connection Bus for Inverters
    {
        type: "bus",
        name: "connector3",
        startX: 230,
        startY: 215,
        endX: 1770,
        endY: 215
    },
    //Inverter 1
    {
        type: "bus",
        name: "bus4",
        startX: 270,
        startY: 215,
        endX: 270,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 258,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 250,
        namePosY: 225
    },
    {
        type: "bus",
        name: "bus13",
        startX: 270,
        startY: 275,
        endX: 270,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 250,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 270,
        startY: 330,
        endX: 270,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 240,
        imgPosY: 340,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
        measurements: [
            {
                name: "P-Meas",
                namePosX: 110,
                namePosY: 300
            },
            {
                name: "Q-Meas",
                namePosX: 110,
                namePosY: 320
            },
            {
                name: "P-Set",
                namePosX: 110,
                namePosY: 360
            },
            {
                name: "Q-Set",
                namePosX: 110,
                namePosY: 380
            }
           
        ]
    },
    //Inverter 2
    {
        type: "bus",
        name: "bus5",
        startX: 480,
        startY: 215,
        endX: 480,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 468,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 438,
        namePosY: 50
    },  
    {
        type: "bus",
        name: "bus13",
        startX: 480,
        startY: 275,
        endX: 480,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 460,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 480,
        startY: 330,
        endX: 480,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 450,
        imgPosY: 340,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
        measurements: [
            {
                name: "P-Meas",
                namePosX: 325,
                namePosY: 300
            },
            {
                name: "Q-Meas",
                namePosX: 325,
                namePosY: 320
            },
            {
                name: "P-Set",
                namePosX: 325,
                namePosY: 360
            },
            {
                name: "Q-Set",
                namePosX: 325,
                namePosY: 380
            }
        ]
    },
    //Inverter 3
    {
        type: "bus",
        name: "bus6",
        startX: 680,
        startY: 215,
        endX: 680,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 668,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 608,
        namePosY: 50
    },
    {
        type: "bus",
        name: "bus13",
        startX: 680,
        startY: 275,
        endX: 680,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 660,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 680,
        startY: 330,
        endX: 680,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 650,
        imgPosY: 340,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
        measurements: [
            {
                name: "P-Meas",
                namePosX: 525,
                namePosY: 300
            },
            {
                name: "Q-Meas",
                namePosX: 525,
                namePosY: 320
            },
            {
                name: "P-Set",
                namePosX: 525,
                namePosY: 360
            },
            {
                name: "Q-Set",
                namePosX: 525,
                namePosY: 380
            }
        ]
    },
    //Inverter 4
    {
        type: "bus",
        name: "bus7",
        startX: 880,
        startY: 215,
        endX: 880,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 868,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 720,
        namePosY: 50
    },
    {
        type: "bus",
        name: "bus13",
        startX: 880,
        startY: 275,
        endX: 880,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 860,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 880,
        startY: 330,
        endX: 880,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 850,
        imgPosY: 340,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
        measurements: [
            {
                name: "P-Meas",
                namePosX: 725,
                namePosY: 300
            },
            {
                name: "Q-Meas",
                namePosX: 725,
                namePosY: 320
            },
            {
                name: "P-Set",
                namePosX: 725,
                namePosY: 360
            },
            {
                name: "Q-Set",
                namePosX: 725,
                namePosY: 380
            }
        ]
    },
    //Inverter 5
    {
        type: "bus",
        name: "bus8",
        startX: 1090,
        startY: 215,
        endX: 1090,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 1078,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 790,
        namePosY: 50
    },
    {
        type: "bus",
        name: "bus13",
        startX: 1090,
        startY: 275,
        endX: 1090,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 1070,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 1090,
        startY: 330,
        endX: 1090,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 1060,
        imgPosY: 340,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
        measurements: [
            {
                name: "P-Meas",
                namePosX: 930,
                namePosY: 300
            },
            {
                name: "Q-Meas",
                namePosX: 930,
                namePosY: 320
            },
            {
                name: "P-Set",
                namePosX: 930,
                namePosY: 360
            },
            {
                name: "Q-Set",
                namePosX: 930,
                namePosY: 380
            }
        ]
    },
    //Inverter 6
    {
        type: "bus",
        name: "bus9",
        startX: 1310,
        startY: 215,
        endX: 1310,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 1298,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 860,
        namePosY: 50
    },
    {
        type: "bus",
        name: "bus13",
        startX: 1310,
        startY: 275,
        endX: 1310,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 1290,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 1310,
        startY: 330,
        endX: 1310,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 1280,
        imgPosY: 340,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
        measurements: [
            {
                name: "P-Meas",
                namePosX: 1135,
                namePosY: 300
            },
            {
                name: "Q-Meas",
                namePosX: 1135,
                namePosY: 320
            },
            {
                name: "P-Set",
                namePosX: 1135,
                namePosY: 360
            },
            {
                name: "Q-Set",
                namePosX: 1135,
                namePosY: 380
            }
        ]
    },
    //Inverter 7
    {
        type: "bus",
        name: "bus10",
        startX: 1520,
        startY: 215,
        endX: 1520,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 1508,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 930,
        namePosY: 50
    },
    {
        type: "bus",
        name: "bus13",
        startX: 1520,
        startY: 275,
        endX: 1520,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 1500,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 1520,
        startY: 330,
        endX: 1520,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 1490,
        imgPosY: 340,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
        measurements: [
            {
                name: "P-Meas",
                namePosX: 1360,
                namePosY: 300
            },
            {
                name: "Q-Meas",
                namePosX: 1360,
                namePosY: 320
            },
            {
                name: "P-Set",
                namePosX: 1360,
                namePosY: 360
            },
            {
                name: "Q-Set",
                namePosX: 1360,
                namePosY: 380
            }
        ]
    },
    //Inverter 8
    {
        type: "bus",
        name: "bus11",
        startX: 1730,
        startY: 215,
        endX: 1730,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 1718,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 1000,
        namePosY: 50
    },
    {
        type: "bus",
        name: "bus13",
        startX: 1730,
        startY: 275,
        endX: 1730,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 1710,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 1730,
        startY: 330,
        endX: 1730,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 1700,
        imgPosY: 340,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
        measurements: [
            {
                name: "P-Meas",
                namePosX: 1570,
                namePosY: 300
            },
            {
                name: "Q-Meas",
                namePosX: 1570,
                namePosY: 320
            },
            {
                name: "P-Set",
                namePosX: 1570,
                namePosY: 360
            },
            {
                name: "Q-Set",
                namePosX: 1570,
                namePosY: 380
            }
        ]
    }
]

export const SldValueData = [
    //POI
    {
        deviceId: "POI",
        measurement: "POIPMeas",
        uom: "MW",
        posX: 890,
        posY: 90
    },
    {
        deviceId: "POI",
        measurement: "POIQMeas",
        uom: "MVar",
        posX: 890,
        posY: 110
    },
    {
        deviceId: "POI",
        measurement: "POIVMeas",
        uom: "kV",
        posX: 1030,
        posY: 60
    },
    {
        deviceId: "POI",
        measurement: "POIIMeas",
        uom: "kAmp",
        posX: 1030,
        posY: 80
    },
    {
        deviceId: "POI",
        measurement: "POIFMeas",
        uom: "",
        posX: 1030,
        posY: 100
    },
    {
        deviceId: "POI",
        measurement: "POIPFMeas",
        uom: "",
        posX: 1045,
        posY: 120
    },
    {
        deviceId: "POI",
        measurement: "POIMeasQual",
        uom: "",
        posX: 1090,
        posY: 140
    },
    //Inverter 1
    {
        deviceId: "INV01",
        measurement: "PMeas",
        uom: "MW",
        posX: 170,
        posY: 300
    },
    {
        deviceId: "INV01",
        measurement: "QMeas",
        uom: "MVar",
        posX: 170,
        posY: 320
    },
    {
        deviceId: "INV01",
        measurement: "AbsPSet",
        uom: "MW",
        posX: 160,
        posY: 360
    },
    {
        deviceId: "INV01",
        measurement: "AbsQSet",
        uom: "MVar",
        posX: 160,
        posY: 380
    },
    //Inverter 2
    {
        deviceId: "INV02",
        measurement: "PMeas",
        uom: "MW",
        posX: 385,
        posY: 300
    },
    {
        deviceId: "INV02",
        measurement: "QMeas",
        uom: "MVar",
        posX: 385,
        posY: 320
    },
    {
        deviceId: "INV02",
        measurement: "AbsPSet",
        uom: "MW",
        posX: 375,
        posY: 360
    },
    {
        deviceId: "INV02",
        measurement: "AbsQSet",
        uom: "MVar",
        posX: 375,
        posY: 380
    },
    //Inverter 3
    {
        deviceId: "INV03",
        measurement: "PMeas",
        uom: "MW",
        posX: 585,
        posY: 300
    },
    {
        deviceId: "INV03",
        measurement: "QMeas",
        uom: "MVar",
        posX: 585,
        posY: 320
    },
    {
        deviceId: "INV03",
        measurement: "AbsPSet",
        uom: "MW",
        posX: 575,
        posY: 360
    },
    {
        deviceId: "INV03",
        measurement: "AbsQSet",
        uom: "MVar",
        posX: 575,
        posY: 380
    },
    //Inverter 4
    {
        deviceId: "INV04",
        measurement: "PMeas",
        uom: "MW",
        posX: 785,
        posY: 300
    },
    {
        deviceId: "INV04",
        measurement: "QMeas",
        uom: "MVar",
        posX: 785,
        posY: 320
    },
    {
        deviceId: "INV04",
        measurement: "AbsPSet",
        uom: "MW",
        posX: 775,
        posY: 360
    },
    {
        deviceId: "INV04",
        measurement: "AbsQSet",
        uom: "MVar",
        posX: 775,
        posY: 380
    },
    //Inverter 5
    {
        deviceId: "INV05",
        measurement: "PMeas",
        uom: "MW",
        posX: 990,
        posY: 300
    },
    {
        deviceId: "INV05",
        measurement: "QMeas",
        uom: "MVar",
        posX: 990,
        posY: 320
    },
    {
        deviceId: "INV05",
        measurement: "AbsPSet",
        uom: "MW",
        posX: 980,
        posY: 360
    },
    {
        deviceId: "INV05",
        measurement: "AbsQSet",
        uom: "MVar",
        posX: 980,
        posY: 380
    },
    //Inverter 6
    {
        deviceId: "INV06",
        measurement: "PMeas",
        uom: "MW",
        posX: 1195,
        posY: 300
    },
    {
        deviceId: "INV06",
        measurement: "QMeas",
        uom: "MVar",
        posX: 1195,
        posY: 320
    },
    {
        deviceId: "INV06",
        measurement: "AbsPSet",
        uom: "MW",
        posX: 1185,
        posY: 360
    },
    {
        deviceId: "INV06",
        measurement: "AbsQSet",
        uom: "MVar",
        posX: 1185,
        posY: 380
    },
    //Inverter 7
    {
        deviceId: "INV07",
        measurement: "PMeas",
        uom: "MW",
        posX: 1420,
        posY: 300
    },
    {
        deviceId: "INV07",
        measurement: "QMeas",
        uom: "MVar",
        posX: 1420,
        posY: 320
    },
    {
        deviceId: "INV07",
        measurement: "AbsPSet",
        uom: "MW",
        posX: 1410,
        posY: 360
    },
    {
        deviceId: "INV07",
        measurement: "AbsQSet",
        uom: "MVar",
        posX: 1410,
        posY: 380
    },
    //Inverter 8
    {
        deviceId: "INV08",
        measurement: "PMeas",
        uom: "MW",
        posX: 1630,
        posY: 300
    },
    {
        deviceId: "INV08",
        measurement: "QMeas",
        uom: "MVar",
        posX: 1630,
        posY: 320
    },
    {
        deviceId: "INV08",
        measurement: "AbsPSet",
        uom: "MW",
        posX: 1620,
        posY: 360
    },
    {
        deviceId: "INV08",
        measurement: "AbsQSet",
        uom: "MVar",
        posX: 1620,
        posY: 380
    },
    //SCADA
    {
        deviceId: "SCADA",
        measurement: "activeMode",
        uom: "",
        posX: 190,
        posY: 110
    },
    {
        deviceId: "SCADA",
        measurement: "PSet",
        uom: "MW",
        posX: 210,
        posY: 130
    },
    {
        deviceId: "SCADA",
        measurement: "QSet",
        uom: "MVar",
        posX: 210,
        posY: 150
    }
]

export const SldData1 = [
    {
        type: "bus",
        name: "bus1",
        startX: 812,
        startY: 25,
        endX: 812,
        endY: 50
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 800,
        imgPosY: 50,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 850,
        namePosY: 50
    },
    {
        type: "bus",
        name: "bus2",
        startX: 812,
        startY: 75,
        endX: 812,
        endY: 83
    },
    {
        type: "device",
        image: "poi",
        imgPosX: 792,
        imgPosY: 80,
        imgWidth: 40,
        imgHeight: 40,
        showName: true,
        name: "POI",
        namePosX: 850,
        namePosY: 100,
        measurements: [
            {
                name: "P",
                namePosX: 750,
                namePosY: 175
            },
            {
                name: "Q",
                namePosX: 750,
                namePosY: 175
            },
            {
                name: "V",
                namePosX: 750,
                namePosY: 175
            },
            {
                name: "I",
                namePosX: 750,
                namePosY: 175
            },
            {
                name: "F",
                namePosX: 750,
                namePosY: 175
            },
            {
                name: "PF",
                namePosX: 750,
                namePosY: 175
            },
            {
                name: "MeasQual",
                namePosX: 750,
                namePosY: 175
            }
        ]
    },
    {
        type: "bus",
        name: "bus3",
        startX: 812,
        startY: 115,
        endX: 812,
        endY: 150
    },
    {
        type: "device",
        image: "block",
        imgPosX: 300,
        imgPosY: 150,
        imgWidth: 330,
        imgHeight: 70,
        showName: false,
        name: "block1",
        namePosX: 850,
        namePosY: 100,
        measurements: [
            {
                name: "Active Mode",
                namePosX: 350,
                namePosY: 175
            },
            {
                name: "POI P Setpoint",
                namePosX: 350,
                namePosY: 190
            },
            {
                name: "POI Q Setpoint",
                namePosX: 350,
                namePosY: 205
            }
        ]
    },
    {
        type: "device",
        image: "block",
        imgPosX: 621,
        imgPosY: 150,
        imgWidth: 700,
        imgHeight: 70,
        showName: true,
        name: "Communication Status",
        namePosX: 720,
        namePosY: 165
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 660,
        imgPosY: 170,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 1",
        namePosX: 680,
        namePosY: 182
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 760,
        imgPosY: 170,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 2",
        namePosX: 780,
        namePosY: 182
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 860,
        imgPosY: 170,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 3",
        namePosX: 880,
        namePosY: 182
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 960,
        imgPosY: 170,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 4",
        namePosX: 980,
        namePosY: 182
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 660,
        imgPosY: 190,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 5",
        namePosX: 680,
        namePosY: 202
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 760,
        imgPosY: 190,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 6",
        namePosX: 780,
        namePosY: 202
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 860,
        imgPosY: 190,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 7",
        namePosX: 880,
        namePosY: 202
    },
    {
        type: "device",
        image: "circle",
        imgPosX: 960,
        imgPosY: 190,
        imgWidth: 15,
        imgHeight: 15,
        showName: true,
        name: "Inverter 8",
        namePosX: 980,
        namePosY: 202
    },
    {
        type: "bus",
        name: "bus4",
        startX: 320,
        startY: 215,
        endX: 320,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 308,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 600,
        namePosY: 225,
        measurements: [
            {
                name: "Measurements",
                namePosX: 220,
                namePosY: 300
            },
            {
                name: "P",
                namePosX: 220,
                namePosY: 320
            },
            {
                name: "Q",
                namePosX: 220,
                namePosY: 340
            },
            {
                name: "Setpoint",
                namePosX: 220,
                namePosY: 360
            },
            {
                name: "P",
                namePosX: 220,
                namePosY: 380
            },
            {
                name: "Q",
                namePosX: 220,
                namePosY: 400
            }
           
        ]
    },

    {
        type: "bus",
        name: "bus13",
        startX: 320,
        startY: 275,
        endX: 320,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 300,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 320,
        startY: 330,
        endX: 320,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 295,
        imgPosY: 350,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
    },

    {
        type: "bus",
        name: "bus5",
        startX: 450,
        startY: 215,
        endX: 450,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 438,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 408,
        namePosY: 50,
        measurements: [
            {
                name: "Measurements",
                namePosX: 355,
                namePosY: 300
            },
            {
                name: "P",
                namePosX: 355,
                namePosY: 320
            },
            {
                name: "Q",
                namePosX: 355,
                namePosY: 340
            },
            {
                name: "Setpoint",
                namePosX: 355,
                namePosY: 360
            },
            {
                name: "P",
                namePosX: 355,
                namePosY: 380
            },
            {
                name: "Q",
                namePosX: 355,
                namePosY: 400
            }
        ]
    },
    
    {
        type: "bus",
        name: "bus13",
        startX: 450,
        startY: 275,
        endX: 450,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 430,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 450,
        startY: 330,
        endX: 450,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 425,
        imgPosY: 350,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
    },

    {
        type: "bus",
        name: "bus6",
        startX: 580,
        startY: 215,
        endX: 580,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 568,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 508,
        namePosY: 50,
        measurements: [
            {
                name: "Measurements",
                namePosX: 485,
                namePosY: 300
            },
            {
                name: "P",
                namePosX: 485,
                namePosY: 320
            },
            {
                name: "Q",
                namePosX: 485,
                namePosY: 340
            },
            {
                name: "Setpoint",
                namePosX: 485,
                namePosY: 360
            },
            {
                name: "P",
                namePosX: 485,
                namePosY: 380
            },
            {
                name: "Q",
                namePosX: 485,
                namePosY: 400
            }
        ]
    },

    {
        type: "bus",
        name: "bus13",
        startX: 580,
        startY: 275,
        endX: 580,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 560,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 580,
        startY: 330,
        endX: 580,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 555,
        imgPosY: 350,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
    },

    {
        type: "bus",
        name: "bus7",
        startX: 710,
        startY: 215,
        endX: 710,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 698,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 850,
        namePosY: 50,
        measurements: [
            {
                name: "Measurements",
                namePosX: 615,
                namePosY: 300
            },
            {
                name: "P",
                namePosX: 615,
                namePosY: 320
            },
            {
                name: "Q",
                namePosX: 615,
                namePosY: 340
            },
            {
                name: "Setpoint",
                namePosX: 615,
                namePosY: 360
            },
            {
                name: "P",
                namePosX: 615,
                namePosY: 380
            },
            {
                name: "Q",
                namePosX: 615,
                namePosY: 400
            }
        ]
    },

    {
        type: "bus",
        name: "bus13",
        startX: 710,
        startY: 275,
        endX: 710,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 690,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 710,
        startY: 330,
        endX: 710,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 690,
        imgPosY: 350,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
    },

    {
        type: "bus",
        name: "bus8",
        startX: 850,
        startY: 215,
        endX: 850,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 838,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 850,
        namePosY: 50,
        measurements: [
            {
                name: "Measurements",
                namePosX: 750,
                namePosY: 300
            },
            {
                name: "P",
                namePosX: 750,
                namePosY: 320
            },
            {
                name: "Q",
                namePosX: 750,
                namePosY: 340
            },
            {
                name: "Setpoint",
                namePosX: 750,
                namePosY: 360
            },
            {
                name: "P",
                namePosX: 750,
                namePosY: 380
            },
            {
                name: "Q",
                namePosX: 750,
                namePosY: 400
            }
        ]
    },

    {
        type: "bus",
        name: "bus13",
        startX: 850,
        startY: 275,
        endX: 850,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 830,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 850,
        startY: 330,
        endX: 850,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 825,
        imgPosY: 350,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
    },


    {
        type: "bus",
        name: "bus9",
        startX: 1000,
        startY: 215,
        endX: 1000,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 988,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 850,
        namePosY: 50,
        measurements: [
            {
                name: "Measurements",
                namePosX: 885,
                namePosY: 300
            },
            {
                name: "P",
                namePosX: 885,
                namePosY: 320
            },
            {
                name: "Q",
                namePosX: 885,
                namePosY: 340
            },
            {
                name: "Setpoint",
                namePosX: 885,
                namePosY: 360
            },
            {
                name: "P",
                namePosX: 885,
                namePosY: 380
            },
            {
                name: "Q",
                namePosX: 885,
                namePosY: 400
            }
        ]
    },

    {
        type: "bus",
        name: "bus13",
        startX: 1000,
        startY: 275,
        endX: 1000,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 980,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 1000,
        startY: 330,
        endX: 1000,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 975,
        imgPosY: 350,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
    },

    {
        type: "bus",
        name: "bus10",
        startX: 1140,
        startY: 215,
        endX: 1140,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 1128,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 850,
        namePosY: 50,
        measurements: [
            {
                name: "Measurement",
                namePosX: 1040,
                namePosY: 300
            },
            {
                name: "P",
                namePosX: 1040,
                namePosY: 320
            },
            {
                name: "Q",
                namePosX: 1040,
                namePosY: 340
            },
            {
                name: "Setpoint",
                namePosX: 1040,
                namePosY: 360
            },
            {
                name: "P",
                namePosX: 1040,
                namePosY: 380
            },
            {
                name: "Q",
                namePosX: 1040,
                namePosY: 400
            }
        ]
    },

    {
        type: "bus",
        name: "bus13",
        startX: 1140,
        startY: 275,
        endX: 1140,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 1120,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 1140,
        startY: 330,
        endX: 1140,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 1120,
        imgPosY: 350,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
    },

    {
        type: "bus",
        name: "bus11",
        startX: 1280,
        startY: 215,
        endX: 1280,
        endY: 250
    },
    {
        type: "device",
        image: "cb-red",
        imgPosX: 1268,
        imgPosY: 250,
        imgWidth: 25,
        imgHeight: 25,
        showName: false,
        name: "CB1",
        namePosX: 850,
        namePosY: 50,
        measurements: [
            {
                name: "Measurements",
                namePosX: 1180,
                namePosY: 300
            },
            {
                name: "P",
                namePosX: 1180,
                namePosY: 320
            },
            {
                name: "Q",
                namePosX: 1180,
                namePosY: 340
            },
            {
                name: "Setpoint",
                namePosX: 1180,
                namePosY: 360
            },
            {
                name: "P",
                namePosX: 1180,
                namePosY: 380
            },
            {
                name: "Q",
                namePosX: 1180,
                namePosY: 400
            }
        ]
    },
    {
        type: "bus",
        name: "bus13",
        startX: 1280,
        startY: 275,
        endX: 1280,
        endY: 290
    },
    {
        type: "device",
        image: "device",
        imgPosX: 1260,
        imgPosY: 290,
        imgWidth: 40,
        imgHeight: 40,
        showName: false,
    },
    {
        type: "bus",
        name: "bus14",
        startX: 1280,
        startY: 330,
        endX: 1280,
        endY: 350
    },
    {
        type: "device",
        image: "solar",
        imgPosX: 1260,
        imgPosY: 350,
        imgWidth: 55,
        imgHeight: 55,
        showName: false,
    },

]