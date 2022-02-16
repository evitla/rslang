import React from 'react';

export default function Rules() {
  return (
    <>
      <article className="sprint_description">
        <p className="rules">Правила</p>
        <ul>
          <li>Время ограничено - 1 мин.</li>
          <li>За каждый верный ответ дается 20баллов.</li>
          <li>
            В случае, если вы отвечаете верно 3 раза подряд, вы получаете
            дополнительно 20 баллов.
          </li>
        </ul>
      </article>
    </>
  );
}
