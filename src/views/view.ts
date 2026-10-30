export interface View {
  el: HTMLElement;
  destroy?(): void;
  /** true while the user is practising (counts towards practice time) */
  practising?: boolean;
}
