import styles from "src/components/About/About.module.scss";

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>About Us</h2>
      </div>
      <div className={styles.content}>
        <p>
          Secutitex is an incorporated limited company registered with the
          corporate affairs commission of Nigeria.
        </p>
        <p>
          Our goal is to create a wealth of jobs for trades persons and labour
          in Nigeria. Given the current economic and real estate development
          challenges in the country we wanted to create a transparent platform
          for real estate transactions or development projects.
        </p>
        <p>
          Secutitex offers a one stop shop through our website for the sole
          purpose of allowing consumers to get competitive prices for skilled
          labour and property purchase.
        </p>
        <p>
          We seek to make real estate in Nigeria efficient and liquid within the
          ambits of the law. Therefore, we have provided a solution where a
          client can provide a specification for a project and we can get our
          certified trades people to provide competitive quotes which a client
          can choose from.
        </p>
        <p>
          Please feel welcome to join our ship and sail to greater heights and
          be rest assured that our customers come first.
        </p>
      </div>
      <div className={styles.affirmation}>
        <h2>Secutitex Ltd.</h2>
      </div>
    </div>
  );
}

export default About;
