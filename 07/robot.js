Robot = function(x, y, z) {
  //
  var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
  var geometry = fromHelper[0];
  var material = fromHelper[1];
  var bones = fromHelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[0];
  this.root.position.set( x, y, z );

  this.head = bones[1];

  var geometry = new THREE.BoxBufferGeometry( 20, 20, 20);
  //var material = new THREE.MeshStandardMaterial({ map: texture });
  var texture = new THREE.TextureLoader().load("iron.png");
  var material = new THREE.MeshStandardMaterial({ map: texture });

  cube = new THREE.Mesh( geometry, material);
  //this.head.add(cube);
  this.neck = bones[2];
  this.neck.add(cube);
  this.neck.position.y = -10;

  //this.head.add(this.neck);  have done by Helper.js

  this.torso = bones[3];
  this.torso.position.y = -30;

  this.body_mesh = mesh;


  //left upper part
  var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'red');
  var geometry = fromHelper[0];
  var material = fromHelper[1];
  var bones = fromHelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  this.neck.add( bones[0] );
  //this.root.position.set( x, y, z );
  //this.root.position.y = -10;

  this.left_upperarm = bones[1];
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;

  this.left_lowerarm = bones[2];
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;

  this.left_hand = bones[3];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;


  this.leftu_mesh = mesh;

  //left lower part
  var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'yellow');
  var geometry = fromHelper[0];
  var material = fromHelper[1];
  var bones = fromHelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  this.torso.add( bones[0] );

  this.left_upperleg = bones[1];
  this.left_upperleg.position.x = 5;
  this.left_upperleg.position.y = -5;

  this.left_lowerleg = bones[2];
  this.left_lowerleg.position.x = 5;
  this.left_lowerleg.position.y = -15;

  this.left_foot = bones[3];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;

  this.leftl_mesh = mesh;


  //right upper part
  var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'green');
  var geometry = fromHelper[0];
  var material = fromHelper[1];
  var bones = fromHelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  this.neck.add( bones[0] );

  this.right_upperarm = bones[1];
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;

  this.right_lowerarm = bones[2];
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -5;

  this.right_hand = bones[3];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;

  this.rightu_mesh = mesh;
  //right lower part
  var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'green');
  var geometry = fromHelper[0];
  var material = fromHelper[1];
  var bones = fromHelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );
  this.torso.add( bones[0] );

  this.right_upperleg = bones[1];
  this.right_upperleg.position.x = -5;
  this.right_upperleg.position.y = -5;

  this.right_lowerleg = bones[2];
  this.right_lowerleg.position.x = -5;
  this.right_lowerleg.position.y = -15;

  this.right_foot = bones[3];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;

  this.rightl_mesh = mesh;

  this.movement = null;

};


Robot.prototype.show = function(scene) {

  //var rGroup = new THREE.Group();
  //rGroup.add( this.head );

  //var helper = new THREE.SkeletonHelper( rGroup );
  //helper.material.linewidth = 3;

  //scene.add(rGroup);
  //scene.add(helper);
  scene.add( this.body_mesh );
  scene.add( this.leftu_mesh );
  scene.add( this.rightu_mesh );
  scene.add( this.leftl_mesh );
  scene.add( this.rightl_mesh );
};

Robot.prototype.raise_left_arm = function() {

  this.movement = 'raise left arm';

};

Robot.prototype.lower_left_arm = function() {

  this.movement = 'lower left arm';

};

Robot.prototype.kick = function() {

  this.movement = 'kick';

};

Robot.prototype.dance = function() {
  
  this.movement = 'dance';

};

Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {

    var T = Math.PI;
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.1 );

  } else  if (this.movement == 'lower left arm') {

    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),
                                        0.1 );

  } else if (this.movement == 'kick') {
  
    // check if slerp reached almost the end
    if (this.right_upperleg.quaternion.w < 0.72) {
  
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
  
    } else {
  
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
  
    }
  
  } else if (this.movement == 'kick done') {
  
    // reset leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
  } else if (this.movement == 'dance') {

    if (typeof this.dancer === 'undefined') {

      this.dancer = setInterval(function() {

        // 
        // some random translation
        //
        var shakehead = 3*Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }

        var shakeneck = 3*Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }

        var shaketorso = 3*Math.random();
        if (Math.random() < .5) {
          shaketorso *= -1;
        }

        this.head.position.x += shakehead;

        this.neck.position.x += shakeneck;

        this.torso.position.x += shaketorso;


        //
        // use actions
        //
        if (Math.random() < .3) {
          this.raise_left_arm();
        }

        if (Math.random() < .3) {
          this.lower_left_arm();
        }

        if (Math.random() < .3) {
          this.kick();
        }

        if (Math.random() < .3) {
          this.movement = 'kick done';
        }

      }.bind(this), 500);

    }

  }

};