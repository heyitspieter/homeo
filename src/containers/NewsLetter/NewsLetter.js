import { useState } from "react";
import { toast } from "react-toastify";
import Svg from "src/components/Svg/Svg";
import { useEmailSubscribe } from "src/hooks/subscribe";
import { updateObject, checkFormValidity } from "src/helpers";
import GoogleV2Recaptcha from "src/components/GoogleV2Recaptcha/GoogleV2Recaptcha";

import styles from "src/components/Footer/Footer.module.scss";

function NewsLetter() {
  const [form, setForm] = useState({
    email: {
      value: "",
    },
  });

  const [recaptcha, setRecaptcha] = useState({
    open: false,
  });

  const [subscribe] = useEmailSubscribe();

  const onSubmitEmail = async (response) => {
    setForm({
      email: {
        value: "",
      },
    });

    setRecaptcha(
      updateObject(recaptcha, {
        open: false,
      })
    );

    const [success, err] = await subscribe({
      email: form.email.value,
      "g-recaptcha": response,
    });

    if (success) {
      toast.success("Thank you for subscribing to our newsletter");
    }

    if (err) {
      toast.error(err);
    }
  };

  const inputChangeHandler = (e) => {
    setForm(
      updateObject(form, {
        email: updateObject(form.email, {
          value: e.target.value,
        }),
      })
    );
  };

  const onOpenRecaptcha = (e) => {
    e.preventDefault();

    const isValid = checkFormValidity(form.email.value, {
      required: true,
      isEmail: true,
    });

    if (isValid) {
      setRecaptcha(
        updateObject(recaptcha, {
          open: true,
        })
      );
    }
  };

  const onSetRecaptchResponse = (response) => {
    onSubmitEmail(response);
  };

  return (
    <>
      <GoogleV2Recaptcha
        visible={recaptcha.open}
        setResponse={onSetRecaptchResponse}
      />
      <div className={styles.newsletter}>
        <h3>
          Subscribe <span>(we will not send spam emails)</span>
        </h3>
        <form className={styles.newsletter__form}>
          <div className={styles.newsletter__form_group}>
            <input
              required
              type="text"
              placeholder=""
              value={form.email.value}
              onChange={(e) => inputChangeHandler(e)}
              className={styles.newsletter__form_input}
            />
            <label className={styles.newsletter__form_label}>
              Enter your email address
            </label>
            <button
              className={styles.btnSend}
              onClick={(e) => onOpenRecaptcha(e)}
            >
              <Svg className={styles.iconSend} symbol="send" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewsLetter;
