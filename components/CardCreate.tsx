import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';

interface ICardCreateComponent {
  createCard(cardContent: string): void;
  setIsCreatingCard: React.Dispatch<React.SetStateAction<boolean>>;
}

function CardCreate({ createCard, setIsCreatingCard }: ICardCreateComponent) {
  const [content, setContent] = useState<string>('');

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
