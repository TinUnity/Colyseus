"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomState = exports.UserState = exports.PlayerState = void 0;
const schema_1 = require("@colyseus/schema");
class PlayerState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.id = "";
        this.playerId = "";
        this.creationId = "";
        this.position_X = 0;
        this.position_Y = 0;
        this.position_Z = 0;
        this.rotation_X = 0;
        this.rotation_Y = 0;
        this.rotation_Z = 0;
        this.rotation_W = 0;
        this.velocity_X = 0;
        this.velocity_Y = 0;
        this.velocity_Z = 0;
        this.attributes = new schema_1.MapSchema();
    }
}
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", String)
], PlayerState.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", String)
], PlayerState.prototype, "playerId", void 0);
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", String)
], PlayerState.prototype, "creationId", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], PlayerState.prototype, "position_X", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], PlayerState.prototype, "position_Y", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], PlayerState.prototype, "position_Z", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], PlayerState.prototype, "rotation_X", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], PlayerState.prototype, "rotation_Y", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], PlayerState.prototype, "rotation_Z", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], PlayerState.prototype, "rotation_W", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], PlayerState.prototype, "velocity_X", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], PlayerState.prototype, "velocity_Y", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], PlayerState.prototype, "velocity_Z", void 0);
__decorate([
    (0, schema_1.type)({ map: 'string' }),
    __metadata("design:type", Object)
], PlayerState.prototype, "attributes", void 0);
exports.PlayerState = PlayerState;
class UserState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.attributes = new schema_1.MapSchema();
    }
}
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", String)
], UserState.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)('string'),
    __metadata("design:type", String)
], UserState.prototype, "sessionId", void 0);
__decorate([
    (0, schema_1.type)('boolean'),
    __metadata("design:type", Boolean)
], UserState.prototype, "isConnected", void 0);
__decorate([
    (0, schema_1.type)('number'),
    __metadata("design:type", Number)
], UserState.prototype, "timeStamp", void 0);
__decorate([
    (0, schema_1.type)({ map: 'string' }),
    __metadata("design:type", Object)
], UserState.prototype, "attributes", void 0);
exports.UserState = UserState;
class RoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.playerStateNetwork = new schema_1.MapSchema();
        this.userStateNetwork = new schema_1.MapSchema();
        this.attributes = new schema_1.MapSchema();
    }
}
__decorate([
    (0, schema_1.type)({ map: PlayerState }),
    __metadata("design:type", Object)
], RoomState.prototype, "playerStateNetwork", void 0);
__decorate([
    (0, schema_1.type)({ map: UserState }),
    __metadata("design:type", Object)
], RoomState.prototype, "userStateNetwork", void 0);
__decorate([
    (0, schema_1.type)({ map: 'string' }),
    __metadata("design:type", Object)
], RoomState.prototype, "attributes", void 0);
exports.RoomState = RoomState;
