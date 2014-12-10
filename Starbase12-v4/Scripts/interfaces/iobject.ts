module interfaces {
    export interface IObject {
        // Properties
        width: number;
        height: number;

        // Methods
        update(): void;
        destroy(): void;
    }
}