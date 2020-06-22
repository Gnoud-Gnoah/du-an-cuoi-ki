let arrNumber = []
let numberPlay = 5
let dataConstNumber = 9 - numberPlay
let zone = []
let data = []
let correctSound, incorrectSound, clappingSound, backGroundSound, question
let onlyOneObject = 0, restart = 0
let direct = 1

class Scene1 extends Phaser.Scene{

    constructor() {
        super('Scene1');
    }

    //load image and audio;
    preload() {
        this.load.pack('dataGame', 'assets/Data/dataGame.json');
    }

    //create game;
    create(){
        this.backGround = this.add.image(0, 0, 'backGround').setOrigin(0, 0)
        this.frameWork = this.add.image(325, 20, 'frameWork').setOrigin(0, 0)
        this.cloud = this.add.image(330, 40, 'cloudMove').setOrigin(0, 0)

        correctSound = this.sound.add('correct')
        incorrectSound = this.sound.add('incorrect')
        clappingSound = this.sound.add('clapping')
        backGroundSound = this.sound.add('backGroundSound')
        question = this.sound.add('question')

        this.scene1()
    }

    scene1(){
        this.carChild = this.add.image(370, 450, 'carChild').setOrigin(0, 0)
        this.carFather = this.add.image(1020, 350, 'carFather').setOrigin(0, 0)
        if(restart === 0){
            this.startButton()
        }
        else{
            this.scene2()
        }
    }

    startButton(){
        this.StartSheet = this.add.image(329, 20, 'StartSheet').setOrigin(0, 0)

        this.startButton1 = this.add.image(660, 200, 'startButton1').setOrigin(0, 0)
        this.startButton1.setInteractive().on('pointerover', () => {
            this.startButton1.destroy()

            this.startButton2 = this.add.image(625, 175, 'startButton2').setOrigin(0, 0)
            this.startButton2.setInteractive().on('pointerup', () => {
                this.StartSheet.destroy()
                this.startButton2.destroy()
                this.scene2()
            })
            this.startButton2.on('pointerout', () =>{
                this.StartSheet.destroy()
                this.startButton2.destroy()
                this.startButton1.destroy()
                this.startButton();
            })
        })

    }

    scene2(){
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        let musicConfigQuestion = {
            mute: false,
            volume: 3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 1
        }
        question.play(musicConfigQuestion)
        backGroundSound.play(musicConfig)
        this.randomDataNumber()
    }

    randomDataNumber(){

        while(arrNumber.length != 9){
            let temp = Phaser.Math.Between(0, 30);
            if(arrNumber.length == 0){
                arrNumber.push(temp)
            }
            else{
                if(arrNumber.indexOf(temp) == -1){
                    arrNumber.push(temp)
                }
            }
        }

        for(let i = 0; i < 8; i++){
            for(let j = i + 1; j < 9; j++){
                if(arrNumber[j] < arrNumber [i]){
                    let temp = arrNumber[i]
                    arrNumber[i] = arrNumber[j]
                    arrNumber[j] = temp
                }
            }
        }

        let dataConstArr = []
        while(dataConstArr.length < dataConstNumber){
            let data = arrNumber[Math.floor(Math.random() * arrNumber.length)]

            if(dataConstArr.length === 0){
                dataConstArr.push(data)
            }
            else{
                if(dataConstArr.indexOf(data) === -1){
                    dataConstArr.push(data)
                }
            }
        }

        let pos = []
        let positive = 0
        for(let i = 0; i < numberPlay; i++){
            while(1){

                let temp = Phaser.Math.Between(0, numberPlay - 1)
                if(pos.length === 0){
                    pos.push(temp)
                    break
                }
                if(pos.indexOf(temp) === -1){
                    pos.push(temp)
                    break
                }
            }
        }

        if(dataConstNumber === 0){
            for(let i = 0; i < 9; i++){
                zone[i] = this.setLocalZones(i, "bridge1").setInteractive()
                data[i] = this.setLocalDataNumberDynamic(arrNumber[i], pos[positive++], i)
            }
        }
        else{
            for(let i = 0; i < 9; i++) {
                for (let j = 0; j < dataConstNumber; j++) {
                    if (i === arrNumber.indexOf(dataConstArr[j])) {
                        data[i] = this.setLocalDataNumberConst(dataConstArr[j], i)
                        break
                    }
                    else{
                        if(j === dataConstNumber - 1){
                            zone[i] = this.setLocalZones(i, "bridge1").setInteractive()
                            data[i] = this.setLocalDataNumberDynamic(arrNumber[i], pos[positive++], i)
                        }
                    }
                }
            }
        }


        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);

        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.input.on('gameobjectdown', function (pointer, gameObject) {

            if(gameObject.name === 0){
                zone[0].input.dropZone = true;
            }
            else if(gameObject.name === 1){
                zone[1].input.dropZone = true;
            }
            else if(gameObject.name === 2){
                zone[2].input.dropZone = true;
            }
            else if(gameObject.name === 3){
                zone[3].input.dropZone = true;
            }
            else if(gameObject.name === 4){
                zone[4].input.dropZone = true;
            }
            else if(gameObject.name === 5){
                zone[5].input.dropZone = true;
            }
            else if(gameObject.name === 6){
                zone[6].input.dropZone = true;
            }
            else if(gameObject.name === 7){
                zone[7].input.dropZone = true;
            }
            else {
                zone[8].input.dropZone = true;
            }

        });

        this.input.on('gameobjectup', function (pointer, gameObject) {

            if(gameObject.name === 0){
                zone[0].input.dropZone = false;
            }
            else if(gameObject.name === 1){
                zone[1].input.dropZone = false;
            }
            else if(gameObject.name === 2){
                zone[2].input.dropZone = false;
            }
            else if(gameObject.name === 3){
                zone[3].input.dropZone = false;
            }
            else if(gameObject.name === 4){
                zone[4].input.dropZone = false;
            }
            else if(gameObject.name === 5){
                zone[5].input.dropZone = false;
            }
            else if(gameObject.name === 6){
                zone[6].input.dropZone = false
            }
            else if(gameObject.name === 7){
                zone[7].input.dropZone = false
            }
            else {
                zone[8].input.dropZone = false
            }

        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            gameObject.x = dropZone.x + 5
            gameObject.y = dropZone.y + 30

            numberPlay--

            if(numberPlay === 0){

                let musicConfig = {
                    mute: false,
                    volume: 3,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay: 0
                }
                correctSound.play(musicConfig)

                let musicConfigClap = {
                    mute: false,
                    volume: 5,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay: 5
                }
                clappingSound.play(musicConfigClap)

            }
            else{
                let musicConfig = {
                    mute: false,
                    volume: 3,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay: 0
                }
                correctSound.play(musicConfig)
            }

            gameObject.input.enabled = false;

        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;

                let musicConfig = {
                    mute: false,
                    volume: 3,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay: 0
                }

                incorrectSound.play(musicConfig)
            }

        });

    }

    setLocalZones(local, image){

        if(local == 0){
            this.bridge1 = this.add.image(480, 430, image).setOrigin(0, 0)
        }
        else if(local == 1){
            this.bridge1 = this.add.image(540, 430, image).setOrigin(0, 0)
        }
        else if(local == 2){
            this.bridge1 = this.add.image(600, 430, image).setOrigin(0, 0)
        }
        else if(local == 3){
            this.bridge1 = this.add.image(660, 430, image).setOrigin(0, 0)
        }
        else if(local == 4){
            this.bridge1 = this.add.image(720, 430, image).setOrigin(0, 0)
        }
        else if(local == 5){
            this.bridge1 = this.add.image(780, 430, image).setOrigin(0, 0)
        }
        else if(local == 6){
            this.bridge1 = this.add.image(840, 430, image).setOrigin(0, 0)
        }
        else if(local == 7){
            this.bridge1 = this.add.image(900, 430, image).setOrigin(0, 0)
        }
        else{
            this.bridge1 = this.add.image(960, 430, image).setOrigin(0, 0)
        }

        return this.bridge1

    }

    setLocalDataNumberConst(dataNumber, local){

        switch (local) {
            case 0:
                this.bridge = this.add.image(480, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(485, 460, dataNumber).setOrigin(0, 0)
                break
            case 1:
                this.bridge = this.add.image(540, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(545, 460, dataNumber).setOrigin(0, 0)
                break
            case 2:
                this.bridge = this.add.image(600, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(605, 460, dataNumber).setOrigin(0, 0)
                break
            case 3:
                this.bridge = this.add.image(660, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(665, 460, dataNumber).setOrigin(0, 0)
                break
            case 4:
                this.bridge = this.add.image(720, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(725, 460, dataNumber).setOrigin(0, 0)
                break
            case 5:
                this.bridge = this.add.image(780, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(785, 460, dataNumber).setOrigin(0, 0)
                break
            case 6:
                this.bridge = this.add.image(840, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(845, 460, dataNumber).setOrigin(0, 0)
                break
            case 7:
                this.bridge = this.add.image(900, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(905, 460, dataNumber).setOrigin(0, 0)
                break
            case 8:
                this.bridge = this.add.image(960, 430, 'bridge').setOrigin(0, 0)
                this.data = this.add.image(965, 460, dataNumber).setOrigin(0, 0)
                break
        }

        return this.data
    }

    setLocalDataNumberDynamic(dataNumber, local, checkOrder){

        switch (local) {
            case 0:
                this.data = this.add.image(355, 555, dataNumber).setName(checkOrder)
                break
            case 1:
                this.data = this.add.image(455, 555, dataNumber).setName(checkOrder)
                break
            case 2:
                this.data = this.add.image(555, 555, dataNumber).setName(checkOrder)
                break
            case 3:
                this.data = this.add.image(655, 555, dataNumber).setName(checkOrder)
                break
            case 4:
                this.data = this.add.image(755, 555, dataNumber).setName(checkOrder)
                break
            case 5:
                this.data = this.add.image(855, 555, dataNumber).setName(checkOrder)
                break
            case 6:
                this.data = this.add.image(955, 555, dataNumber).setName(checkOrder)
                break
            case 7:
                this.data = this.add.image(1055, 555, dataNumber).setName(checkOrder)
                break
            case 8:
                this.data = this.add.image(1155, 555, dataNumber).setName(checkOrder)
                break
        }

        this.data.setOrigin(0, 0).setInteractive()
        this.input.setDraggable(this.data);

        return this.data
    }

    //Update;
    update(){

        this.moveOnCloud()

        if(numberPlay === 0) {
            numberPlay = -1
            this.time.delayedCall(2000, function Correct() {

                this.destroyObject()

            }, [], this);
        }

        if(numberPlay === - 1){
            numberPlay = -2
            this.time.delayedCall(4000, function Correct() {

                this.createBridge()
                this.children.bringToTop(this.carChild);

            }, [], this);
        }

        if(numberPlay === -2){
            this.time.delayedCall(6000, function Correct() {

                this.animationCar()

            }, [], this);
        }

        if(numberPlay === -3 && onlyOneObject === 0){
            this.scene3()
        }

    }

    moveOnCloud(){
        if(this.cloud.x === 525){
            direct = -1
        }
        if(this.cloud.x === 330){
            direct = 1
        }

        this.cloud.x += direct*1
    }

    animationCar(){
        this.children.bringToTop(this.carChild)
        if(this.carChild.x < 1000) {
            this.carChild.x += 1.5
        }
        else{
            numberPlay = -3
        }
    }

    destroyObject(){
        for(let i = 0; i < 9; i++) {
            data[i].destroy()
        }
    }

    createBridge(){
        for(let i = 0; i < 9; i++){
            if(zone[i] !== null){
                zone[i] = this.setLocalZones(i, "bridge").setInteractive()
            }
        }
    }

    scene3(){
        onlyOneObject++
        restart++
        this.endGame = this.add.image(525, 150, 'endGame').setOrigin(0, 0)
        this.restartButotn = this.add.image(704, 340, 'restartButton').setOrigin(0, 0)
        backGroundSound.stop()
        clappingSound.stop()
        this.restartButotn.setInteractive().on('pointerdown', () => {
            numberPlay = 9 - dataConstNumber
            onlyOneObject = 0
            this.scene.start('Scene1');
        })
    }

}

