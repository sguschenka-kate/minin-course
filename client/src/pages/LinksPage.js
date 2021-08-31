import React, { useCallback, useContext, useEffect, useState } from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/auth.context';
import {Loader} from '../components/Loader';
import {LinksList} from '../components/LinksList.js';

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);
  
  const fetchLinks = useCallback(async() => {
    try {
      const data = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(data);
    } catch (e) {

    }
  }, [request, token])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader />
  }

  return (
    <>
    {!loading && <LinksList links={links} />}
    </>
  )
}