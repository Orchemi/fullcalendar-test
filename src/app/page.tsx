'use client';

import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

type EventType = {
  title: string;
  date: string;
};

export default function Calendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<EventType[]>([]);

  // FullCalendar API 가져오기
  const getApi = () => calendarRef.current?.getApi();

  // 날짜 클릭 시 이벤트 추가
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: any) => {
    const title = window.prompt('이벤트 제목을 입력하세요');
    if (title) {
      setEvents((prev) => [...prev, { title, date: arg.dateStr }]);
    }
  };

  return (
    <div className="bg-white p-4">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => getApi()?.prevYear()}
          className="rounded bg-gray-200 px-2 py-1"
        >
          이전 년도
        </button>
        <button
          onClick={() => getApi()?.prev()}
          className="rounded bg-gray-200 px-2 py-1"
        >
          이전 달
        </button>
        <button
          onClick={() => getApi()?.today()}
          className="rounded bg-blue-500 px-2 py-1 text-white"
        >
          오늘
        </button>
        <button
          onClick={() => getApi()?.next()}
          className="rounded bg-gray-200 px-2 py-1"
        >
          다음 달
        </button>
        <button
          onClick={() => getApi()?.nextYear()}
          className="rounded bg-gray-200 px-2 py-1"
        >
          다음 년도
        </button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        dateClick={handleDateClick}
        events={events}
      />
    </div>
  );
}
