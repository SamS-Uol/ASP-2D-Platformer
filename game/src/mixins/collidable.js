// allows classes to access similar functions

export default {
    // create a collider between "this" object and collision object
    addCollider(collisionObject, callback) {
        this.scene.physics.add.collider(this, collisionObject, callback, null, this);
    }
}