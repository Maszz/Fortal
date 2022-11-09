import {
  useGetEventListQuery,
  useLazyGetEventListQuery,
  useLazyGetEventUserListQuery,
} from '../redux/apis/EventApi';
import {useState, useEffect} from 'react';
import {GetEventResponse} from '../redux/apis/EventApi';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {setLoadingAction} from '../redux/reducers/navigation';
import {useAuth} from '../hooks/useAuth';
export type EventListType = 'home' | 'user';
const useGetEventList = (t: EventListType) => {
  const {user} = useAuth();
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    u: user.username,
  });
  const isLoadingState = useSelector<
    RootState,
    RootState['navigation']['isLoading']
  >((state: RootState) => state.navigation.isLoading);
  const dispatch = useDispatch();

  const [endReached, setEndReached] = useState(false);
  //   const {data, error, refetch, isFetching} = useGetEventListQuery(params, {
  //     refetchOnMountOrArgChange: true,
  //   });
  const [fetchMore, {data, isFetching: isFetchingMore}] =
    t === 'home' ? useLazyGetEventListQuery() : useLazyGetEventUserListQuery();

  const [isLoading, setLoading] = useState(false);
  const [eventList, setEventList] = useState<GetEventResponse[]>(
    [] as GetEventResponse[],
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchMore(params)
      .unwrap()
      .then((data: GetEventResponse[]) => {
        if (data.length > 0) {
          setEventList(data);
          setParams({
            ...params,
            offset: params.offset + params.limit,
            limit: params.limit,
          });
        }
      });
    return () => {
      setIsMounted(false);
    };
  }, []);

  const loadMore = () => {
    if (isLoading || endReached) {
      return;
    }
    setLoading(true);
    console.log('fires');
    fetchMore(params)
      .unwrap()
      .then((data: GetEventResponse[]) => {
        if (data.length > 0) {
          setEventList([...eventList, ...data]);
          setParams({
            ...params,
            offset: params.offset + params.limit,
            limit: params.limit,
          });
        }
        if (data.length < params.limit) {
          setEndReached(true);
        }
      });
    setLoading(false);
  };
  const refetch = () => {
    setEndReached(false);
    dispatch(setLoadingAction(true));
    fetchMore({offset: 0, limit: 10, u: user.username})
      .unwrap()
      .then((data: GetEventResponse[]) => {
        if (data.length > 0) {
          setEventList(data);
          setParams({
            u: user.username,
            offset: 10,
            limit: 10,
          });
        }
        dispatch(setLoadingAction(false));
      });
  };

  const refocus = () => {
    if (isLoading) {
      return;
    }
    // dispatch(setLoadingAction(true));
    fetchMore({
      offset: 0,
      limit: params.offset + params.limit,
      u: user.username,
    })
      .unwrap()
      .then((data: GetEventResponse[]) => {
        if (data.length > 0) {
          setEventList(data);
        }
        // dispatch(setLoadingAction(false));
      });
  };

  return {loadMore, eventList, refetch, refocus};
};

export {useGetEventList};
