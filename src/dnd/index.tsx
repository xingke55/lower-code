import './index.scss';
import { useDrop } from 'react-dnd';
import { DragBox } from './dragBox';
import { DragLayer } from './dragLayer';
import { useCallback, useState } from 'react';
import { Card } from './sortList';
import type { CardItem } from './sortList';
export const DndCpn = () => {
  const [boxes, setBoxes] = useState<{ color: string }>([]);
  const [cardList, setCardList] = useState<CardItem[]>([
    {
      id: 0,
      content: '000',
    },
    {
      id: 1,
      content: '111',
    },
    {
      id: 2,
      content: '222',
    },
    {
      id: 3,
      content: '333',
    },
    {
      id: 4,
      content: '444',
    },
  ]);
  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: 'drag-box',
    drop(_item: unknown, monitor) {
      setBoxes((boxes) => [...boxes, _item]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));
  // console.log(isOver, isOverCurrent);
  const swapIndex = useCallback((index1: number, index2: number) => {
    setCardList((prev) => {
      const newList = [...prev];
      const tmp = newList[index1];
      newList[index1] = newList[index2];
      newList[index2] = tmp;
      return newList;
    });
  }, []);
  return (
    <>
      <div className="dnd-page">
        <div className="dnd-drag">
          <DragBox color="green" text="box1"></DragBox>
          <DragBox color="#abc" text="box2"></DragBox>
          <DragBox color="#17d793" text="box3"></DragBox>
        </div>
        <div className="dnd-drop" ref={drop}>
          {boxes.map((item) => {
            return (
              <div
                style={{
                  color: '#fff',
                  width: '100px',
                  height: '100px',
                  backgroundColor: item.color,
                }}
              >
                {item.color}
              </div>
            );
          })}
        </div>
        <DragLayer></DragLayer>
      </div>
      <div className="card-list">
        {cardList.map((item: CardItem, index: number) => (
          <Card data={item} key={'card_' + item.id} index={index} swapIndex={swapIndex} />
        ))}
      </div>
    </>
  );
};
