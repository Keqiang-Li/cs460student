Robot = function(x, y, z) {
	//constructor
	console.log('new robot');

	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y;
	this.head.position.z = z;

	this.neck = new THREE.Bone();
	this.neck.position.y = -10; //relative to the head

	this.head.add(this.neck);

	this.left_upper_arm = new THREE.Bone();
	this.left_upper_arm.position.y = -5;
	this.left_upper_arm.position.x = 5;

	this.neck.add(this.left_upper_arm);

	// other limbs ...
	this.left_lower_arm = new THREE.Bone();
	this.left_lower_arm.position.y = -15;
	this.left_lower_arm.position.x = 5;
	this.left_upper_arm.add(this.left_lower_arm);

	this.left_hand = new THREE.Bone();
	this.left_hand.position.y = -5;
	this.left_hand.position.x = 5;
	this.left_lower_arm.add(this.left_hand);

	this.right_upper_arm = new THREE.Bone();
	this.right_upper_arm.position.y = -5;
	this.right_upper_arm.position.x = -5;

	this.neck.add(this.right_upper_arm);

	this.right_lower_arm = new THREE.Bone();
	this.right_lower_arm.position.y = -15;
	this.right_lower_arm.position.x = -5;
	this.right_upper_arm.add(this.right_lower_arm);

	this.right_hand = new THREE.Bone();
	this.right_hand.position.y = -5;
	this.right_hand.position.x = -5;
	this.right_lower_arm.add(this.right_hand);

	this.torso = new THREE.Bone();
	this.torso.position.y = -30;
	this.neck.add(this.torso);

	this.upper_left_leg = new THREE.Bone();
	this.upper_left_leg.position.y = -10;
	this.upper_left_leg.position.x = -5;
	this.torso.add(this.upper_left_leg); 

	this.lower_left_leg = new THREE.Bone();
	this.lower_left_leg.position.y = -20;
	this.lower_left_leg.position.x = -5;
	this.upper_left_leg.add(this.lower_left_leg);

	this.left_foot = new THREE.Bone();
	this.left_foot.position.y = -5;
	this.left_foot.position.x = -5;
	this.lower_left_leg.add(this.left_foot);

	this.upper_right_leg = new THREE.Bone();
	this.upper_right_leg.position.y = -10;
	this.upper_right_leg.position.x = 5;
	this.torso.add(this.upper_right_leg); 

	this.lower_right_leg = new THREE.Bone();
	this.lower_right_leg.position.y = -20;
	this.lower_right_leg.position.x = 5;
	this.upper_right_leg.add(this.lower_right_leg);

	this.right_foot = new THREE.Bone();
	this.right_foot.position.y = -5;
	this.right_foot.position.x = 5;
	this.lower_right_leg.add(this.right_foot);
};

Robot.prototype.show = function(scene) {

	console.log(this.neck.position);
	//console.log(this.movement);
	console.log("1");

	rGroup = new THREE.Group();
	rGroup.add(this.head);

	scene.add(rGroup);

	var helper = new THREE.SkeletonHelper(rGroup);
	helper.material.linewidth = 3; // make the skeleton thick

	scene.add(helper);

};
Robot.prototype.raise_left_arm = function() {this.movement = 'raise left arm';};
Robot.prototype.lower_left_arm = function() {this.movement = 'lower left arm';};
Robot.prototype.raise_right_arm = function() {this.movement = 'raise right arm';};
Robot.prototype.lower_right_arm = function() {this.movement = 'lower right arm';};
Robot.prototype.dance = function(){
	this.movement = 'dance';
};
Robot.prototype.kick = function() {this.movement = 'kick';};
Robot.prototype.onAnimate = function() {
  if (this.movement == 'raise left arm') {
    var T = -Math.PI;
    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),   // x
                                                              0,               // y
                                                              0,               // z
                                                              Math.cos(T/2)),  // w
                                        0.1 );
 
  } else if (this.movement == 'kick') {
 
    // check if slerp reached almost the end
    if (this.upper_right_leg.quaternion.w < 0.72) {
 
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
 
    } else {
 
      var T = -Math.PI/2;
      this.upper_right_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
                                      
    }
 
  } 
  else if (this.movement == 'kick done') {
 
    // reset leg back to identity
    this.upper_right_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
 
  }
  else if (this.movement == 'lower left arm'){
  	this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                              0,               // y
                                                              0,               // z
                                                              0),  // w
                                        0.1 );
  }
  else if (this.movement == 'raise right arm'){
  	var T = -Math.PI;
    this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),   // x
                                                              0,               // y
                                                              0,               // z
                                                              Math.cos(T/2)),  // w
                                        0.1 );
 
  }
  else if (this.movement == 'lower right arm'){
  	this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                              0,               // y
                                                              0,               // z
                                                              0),  // w
                                        0.1 );
  }
  else if (this.movement == 'dance'){
  	var T = -Math.PI;
    this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),   // x
                                                              0,               // y
                                                              0,               // z
                                                              Math.cos(T/2)),  // w
                                        0.1 );
    this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),   // x
                                                              0,               // y
                                                              0,               // z
                                                              Math.cos(T/2)),  // w
                                        0.1 );
    this.torso.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),
    																									0,
    																									0,
    																									Math.cos(T/4)),
    																		0.1 );
    this.upper_right_leg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),
    																									0,
    																									0,
    																									-Math.cos(T/2)),
    																		0.1 );

  }
 
};
/*function dan(){
	var a =Math.floor(Math.random() * (5) + 1);
	switch (a){
		case 1:
		this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                              0,               // y
                                                              0,               // z
                                                              0),  // w
                                        0.1 );
		break;
		case 2:
		this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                              0,               // y
                                                              0,               // z
                                                              0),  // w
                                        0.1 );
		break;
		case 3:
		this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                              0,               // y
                                                              0,               // z
                                                              0),  // w
                                        0.1 );
    break;
		case 4:
		this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                              0,               // y
                                                              0,               // z
                                                              0),  // w
                                        0.1 );
		break;
		case 5:
		this.right_upper_arm.quaternion.slerp( new THREE.Quaternion(0,   // x
                                                              0,               // y
                                                              0,               // z
                                                              0),  // w
                                        0.1 );
		break;
	}
};*/