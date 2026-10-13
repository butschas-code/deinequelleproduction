"use client";

import { useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import { ContactForm } from "./ContactForm";
import styles from "./InfoConversationDialog.module.css";

export function InfoConversationDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const pathname = usePathname();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const open = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>("[data-info-conversation]");
      if (!trigger || dialog.open) return;
      event.preventDefault();
      trigger.focus();
      dialog.showModal();
    };

    document.addEventListener("click", open);
    return () => {
      document.removeEventListener("click", open);
      dialog.close();
    };
  }, [pathname]);

  return (
    <dialog
      ref={dialogRef}
      data-info-conversation-dialog
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
          event.currentTarget.close();
        }
      }}
    >
      <div className={styles.heading}>
        <button type="button" className={styles.close} aria-label="Infogespräch-Formular schliessen" onClick={() => dialogRef.current?.close()}>×</button>
        <h2 id={titleId}>Kostenfreies Infogespräch</h2>
        <p id={descriptionId}>Hinterlasse deine Kontaktdaten und wähle, ob ich dich anrufen oder dir einen Kalenderlink senden soll.</p>
      </div>
      <ContactForm autoFocus />
    </dialog>
  );
}
