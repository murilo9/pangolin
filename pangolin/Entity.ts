import { Game } from "./main"

export class Entity {
  public run(){}

  /**
   * Triggered by Game if a keyUp event occurred.
   * @param keyEvent Event
   */
  public onKeyUp(keyEvent: KeyboardEvent){}

  /**
   * Triggered by Game if a keyDown event occurred.
   * @param keyEvent Event
   */
  public onKeyDown(keyEvent: KeyboardEvent){}

  /**
   * Trigered by Game if the mouse has been clicked anywhere.
   * @param mouseEvent Event
   */
  public onGlobalMouseUp(mouseEvent: MouseEvent){}
  
  /**
   * Triggered by Game if the mouse has been realeased anywhere.
   * @param mouseEvent Event
   */
  public onGlobalMouseDown(mouseEvent: MouseEvent){}
}