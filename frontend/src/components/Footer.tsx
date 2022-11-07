// // Reusable components (e.g: Navbar, Footer, Slider,...) to be put here

// // File names in Pascal Case (e.g: RegisterForm.js, CategoryItem.js,...)

// // If there are many components of
// // the same type (e.g: HomeNavbar, DashboardNavbar,...),
// // create a subfolder for them

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './dnd/SortableItem';

export default function Footer() {
  const [items, setItems] = useState({
    root: ['1', '2', '3'],
    container1: ['4', '5', '6'],
  });
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="bg-green-200">
        <SortableContext
          id={'root'}
          items={items.root}
          strategy={verticalListSortingStrategy}
        >
          {items.root.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </div>

      <SortableContext
        id={'container1'}
        items={items.container1}
        strategy={verticalListSortingStrategy}
      >
        {items.container1.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
    </DndContext>
  );

  function findContainer(id: UniqueIdentifier) {
    if (id in items) {
      return id;
    }
    type ItemsKey = keyof typeof items;

    return Object.keys(items).find((key) =>
      items[key as ItemsKey].includes(id as string)
    );
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over?.id as UniqueIdentifier);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    type ItemsKey = keyof typeof items;

    const activeIndex = items[activeContainer as ItemsKey].indexOf(
      active.id as string
    );
    const overIndex = items[overContainer as ItemsKey].indexOf(
      over?.id as string
    );

    console.log(activeIndex);
    console.log(over);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer as ItemsKey],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);

    // if (active.id !== over?.id) {
    //   setItems((items) => {
    //     const oldIndex = items.indexOf(active.id as number);
    //     const newIndex = items.indexOf(over?.id as number);

    //     return arrayMove(items, oldIndex, newIndex);
    //   });
    // }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    // Find the containers
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over?.id as UniqueIdentifier);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    type ItemsKey = keyof typeof items;

    setItems((prev) => {
      const activeItems = prev[activeContainer as ItemsKey];
      const overItems = prev[overContainer as ItemsKey];

      // Find the indexes for the items
      const activeIndex = items[activeContainer as ItemsKey].indexOf(
        active.id as string
      );
      const overIndex = items[overContainer as ItemsKey].indexOf(
        over?.id as string
      );

      let newIndex = overItems.length + 1;
      // if (overId in prev) {
      //   // We're at the root droppable of a container
      //   newIndex = overItems.length + 1;
      // } else {
      //   const isBelowLastItem =
      //     over &&
      //     overIndex === overItems.length - 1 &&
      //     draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

      //   const modifier = isBelowLastItem ? 1 : 0;

      //   newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      // }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer as ItemsKey].filter(
            (item) => item !== active.id
          ),
        ],
        [overContainer]: [
          ...prev[overContainer as ItemsKey].slice(0, newIndex),
          items[activeContainer as ItemsKey][activeIndex],
          ...prev[overContainer as ItemsKey].slice(
            newIndex,
            prev[overContainer as ItemsKey].length
          ),
        ],
      };
    });
  }
}
