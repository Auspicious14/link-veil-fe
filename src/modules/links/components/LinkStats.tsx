'use client';

import { useEffect, useState } from 'react';
import { Link as LinkType } from '../types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/lib/axios';

interface LinkStatsProps {
  link: LinkType;
}

interface Stats {
  totalClicks: number;
  uniqueVisitors: number;
  dailyClicks: { date: string; count: number }[];
}

export function LinkStats({ link }: LinkStatsProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/links/${link._id}/stats`);
        const statsData = response.data.data || response.data;
        setStats({
          totalClicks: statsData.totalClicks || link.clickCount || 0,
          uniqueVisitors: statsData.uniqueVisitors || 0,
          dailyClicks: statsData.dailyClicks || []
        });
      } catch (error) {
        console.error('Error fetching link stats:', error);
        // Fallback to basic stats from link object
        setStats({
          totalClicks: link.clickCount || 0,
          uniqueVisitors: 0,
          dailyClicks: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [link._id, link.clickCount]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Link Statistics</CardTitle>
        <CardDescription>
          Track how your link is performing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 border rounded-md">
            <span className="text-2xl font-bold">{stats?.totalClicks || 0}</span>
            <span className="text-sm text-muted-foreground">Total Clicks</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border rounded-md">
            <span className="text-2xl font-bold">{stats?.uniqueVisitors || 0}</span>
            <span className="text-sm text-muted-foreground">Unique Visitors</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}