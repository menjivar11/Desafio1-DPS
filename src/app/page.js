import Form from "@/components/Form";
import styles from "./page.module.css";
import Todo from "@/components/Todo";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="App">
        <div>
          <p>
            Lista de Compras
          </p>
          <Form></Form>
        </div>
      </div>
    </main>
  );
}
