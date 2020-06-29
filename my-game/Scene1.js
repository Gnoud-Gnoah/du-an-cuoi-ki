let dataChooseNumber = 9
let dataDynamicNumber = 5
let dataConstNumber = dataChooseNumber - dataDynamicNumber

let arrNumber = []
let zone = []
let data = []
let sound = []

let correctSound, incorrectSound, clappingSound, backGroundSound, question

let onlyOneObject = 0, restart = 0
let direct = 1
let muteCheck = false

let localStartOfDataX = 480
let localStartOfDataY = 400
let midX = 755
let midY = 515

class Scene1 extends Phaser.Scene{

    constructor() {
        super('Scene1');
    }

    //load image and audio;
    preload() {
        // loading game;
        let progress = this.add.graphics();
        let text1 = this.add.text(520, 380, "LOADING GAME!",  {font: '50px Arial', fill: 'white'})

        this.load.on('progress', function (value) {

            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 1525 * value, 100);
            text1.setText("LOADING GAME " + Math.floor(100*value) + "%" )
        })

        this.load.on('complete', function () {

            progress.destroy();

        })

        // load file json data images and audios
        this.load.pack('dataGame', 'assets/Data/dataGame.json');
        this.load.animation('animCorrect', 'assets/Data/animFireWork.json');


        //this.load.atlas('correct', 'assets/Animations/correct.png', 'assets/Data/fireWork.json');
    }

    //create game;
    create(){
        // add image for first scene
        this.backGround = this.add.image(0, 0, 'backGround').setOrigin(0, 0)
        this.frameWork = this.add.image(325, 20, 'frameWork').setOrigin(0, 0)
        this.cloud = this.add.image(330, 20, 'cloudMove').setOrigin(0, 0)

        // add audio for game
        correctSound = this.sound.add('correct')
        incorrectSound = this.sound.add('incorrect')
        clappingSound = this.sound.add('clapping')
        backGroundSound = this.sound.add('backGroundSound')
        question = this.sound.add('question')
        for(let i = 0; i < 31; i++){
            sound[i] = this.sound.add(i)
        }

        // control sound backgroud in game
        this.muteSoundController()

        // goi hoat canh 1
        this.scene1()
    }

    scene1(){
        this.carChild = this.add.image(370, 420, 'carChild').setOrigin(0, 0)
        this.carFather = this.add.image(1020, 320, 'carFather').setOrigin(0, 0)
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

        // random lay dataChooseNumber (== 9) so khac nhau tu 0-30
        // dua het vao 1 mang arrNumber
        while(arrNumber.length != dataChooseNumber){
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

        // sap xep mang arrNumber tu be den lon
        for(let i = 0; i < 8; i++){
            for(let j = i + 1; j < 9; j++){
                if(arrNumber[j] < arrNumber [i]){
                    let temp = arrNumber[i]
                    arrNumber[i] = arrNumber[j]
                    arrNumber[j] = temp
                }
            }
        }

        // random trong mang arrNumber tu lay 1 so luong dataConstNumber = dataChooseNumber - dataDynamicNumber (9 - 6)
        // dua tat cac so do vao mang dataConstArr lam cac so co dinh cho game.
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

        // random cac vi tri cua du lieu can sap xep (sao tron du lieu de nguoi choi sap xep lai)
        let pos = []
        let positive = 0
        for(let i = 0; i < dataDynamicNumber; i++){
            while(1){

                let temp = Phaser.Math.Between(0, dataDynamicNumber - 1)
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

        //xuat cac du lieu tinh va dong ra man hinh
        if(dataConstNumber === 0){
            for(let i = 0; i < 9; i++){
                zone[i] = this.setLocalZones(localStartOfDataX, localStartOfDataY, i, "bridge1").setInteractive()
                data[i] = this.setLocalDataNumberDynamic(arrNumber[i], pos[positive++], i)
            }
        }
        else{
            for(let i = 0; i < 9; i++) {
                for (let j = 0; j < dataConstNumber; j++) {
                    if (i === arrNumber.indexOf(dataConstArr[j])) {
                        data[i] = this.setLocalDataNumberConst(localStartOfDataX, localStartOfDataY, dataConstArr[j], i)
                        break
                    }
                    else{
                        if(j === dataConstNumber - 1){
                            zone[i] = this.setLocalZones(localStartOfDataX, localStartOfDataY, i, "bridge1").setInteractive()
                            data[i] = this.setLocalDataNumberDynamic(midX, midY, arrNumber[i], pos[positive++], i)
                        }
                    }
                }
            }
        }


        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);

            gameObject.setScale(1.5);

        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            gameObject.x = dropZone.x + 5
            gameObject.y = dropZone.y + 30

            if(gameObject.name === dropZone.name){
                dataDynamicNumber--

                if(dataDynamicNumber === 0){

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

                gameObject.setScale(1);
                gameObject.input.enabled = false;
            }
            else{
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;

                gameObject.setScale(1)


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


            let musicConfig = {
                mute: false,
                volume: 3,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 1
            }

            sound[arrNumber[gameObject.name]].play(musicConfig)

        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;

                gameObject.setScale(1)

            }

        });

    }

    // (480, 400) x += 60
    setLocalZones(x, y, local, image){

        this.bridge1 = this.add.image(x + local*60, y, image).setName(local).setOrigin(0, 0)
        this.bridge1.setInteractive()
        this.bridge1.input.dropZone = true

        return this.bridge1

    }

    // (480, 400) x += 60; (x += 5, y + 30)
    setLocalDataNumberConst(x, y, dataNumber, local){

        this.bridge = this.add.image(x + 60*local, y, 'bridge').setOrigin(0, 0)
        this.data = this.add.image(this.bridge.x + 5, y + 30, dataNumber).setOrigin(0, 0)

        return this.data
    }

    // mid (755, 515)
    setLocalDataNumberDynamic(x, y, dataNumber, local, checkOrder){

        if(local%2 === 0){
            this.data = this.add.image(x + (local/2)*100, y, dataNumber).setName(checkOrder)
        }
        else{
            this.data = this.add.image(x - ((local/2) + 0.5)*100, y, dataNumber).setName(checkOrder)
        }


        this.data.setOrigin(0, 0).setInteractive()
        this.input.setDraggable(this.data);

        return this.data
    }

    //Update;
    update(){

        this.moveOnCloud()

        if(dataDynamicNumber === 0) {
            dataDynamicNumber = -1
            this.time.delayedCall(2000, function Correct() {

                this.destroyObject()

            }, [], this);
        }

        if(dataDynamicNumber === - 1){
            dataDynamicNumber = -2
            this.time.delayedCall(4000, function Correct() {

                this.createBridge()
                this.children.bringToTop(this.carChild);

            }, [], this);
        }

        if(dataDynamicNumber === -2){
            this.time.delayedCall(6000, function Correct() {

                this.animationCar()

            }, [], this);
        }

        if(dataDynamicNumber === -3 && onlyOneObject === 0){
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
            dataDynamicNumber = -3
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
                zone[i] = this.setLocalZones(localStartOfDataX, localStartOfDataY, i, "bridge").setInteractive()
            }
        }
    }

    muteSoundController(){
        if(muteCheck == false){
            this.noMuteSound = this.add.image(1150, 550, 'noMuteSound').setOrigin(0, 0)
            this.noMuteSound.setInteractive().on('pointerdown', () =>{
                this.noMuteSound.destroy()
                question.mute = true
                backGroundSound.mute = true
                muteCheck = true
                this.muteSoundController()
            })
        }
        else{
            this.muteSound = this.add.image(1150, 550, 'muteSound').setOrigin(0, 0)
            this.muteSound.setInteractive().on('pointerdown', () =>{
                this.muteSound.destroy()
                question.mute = false
                backGroundSound.mute = false
                muteCheck = false
                this.muteSoundController()
            })
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
            dataDynamicNumber = 9 - dataConstNumber
            onlyOneObject = 0
            this.scene.start('Scene1');
        })
    }

}

