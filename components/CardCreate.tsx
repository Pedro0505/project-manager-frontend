import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';

interface ICardCreateComponent {
  createCard(cardContent: string): void;
  setIsCreatingCard: React.Dispatch<React.SetStateAction<boolean>>;
}

function CardCreate({ createCard, setIsCreatingCard }: ICardCreateComponent) {
  const [content, setContent] = useState<string>('');
  const maxLength = 190;

  const handleCancel = () => {
    setIsCreatingCard(false);
  };

  return (
    <div>
      <textarea
        value={content}
        maxLength={190}
        onChange={({ target }) => setContent(target.value)}
        onBlur={() => createCard(content)}
      />
      <p>{ maxLength - content.length }</p>
      <div>
        <button type="button" onMouseDown={() => createCard(content)}>
          Adicionar card
        </button>
        <button type="button" onMouseDown={handleCancel}>
          <MdOutlineClose />
        </button>
      </div>
    </div>
  );
}

export default CardCreate;
