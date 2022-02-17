import React from 'react';
import { PreviewSprint } from './styles';

export default function Rules() {
  return (
    <PreviewSprint>
      <article className="sprint_description">
        <h2 className="rules">Правила</h2>
        <ul>
          <li>Время ограничено - 1 мин.</li>
          <li>За каждый верный ответ дается 20 баллов.</li>
          <li>
            В случае, если вы отвечаете верно 3 раза подряд, вы получаете
            дополнительно 20 баллов.
          </li>
        </ul>
      </article>
    </PreviewSprint>
  );
}
