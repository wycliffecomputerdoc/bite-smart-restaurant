
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ShoppingCart, Calendar, DollarSign, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Admin = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin (you can modify this logic based on your admin setup)
    if (!user || !userProfile?.full_name?.includes('admin')) {
      toast.error("Access denied. Admin privileges required.");
      navigate('/');
      return;
    }
    
    fetchData();
  }, [user, userProfile, navigate]);

  const fetchData = async () => {
    try {
      const [ordersResult, reservationsResult] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('reservations').select('*').order('created_at', { ascending: false })
      ]);

      if (ordersResult.error) throw ordersResult.error;
      if (reservationsResult.error) throw reservationsResult.error;

      setOrders(ordersResult.data || []);
      setReservations(reservationsResult.data || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: status })
        .eq('id', orderId);

      if (error) throw error;
      
      toast.success('Order status updated');
      fetchData();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const updateReservationStatus = async (reservationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ payment_status: status })
        .eq('id', reservationId);

      if (error) throw error;
      
      toast.success('Reservation status updated');
      fetchData();
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast.error('Failed to update reservation status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-xl">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0);
  const totalDeposits = reservations.reduce((sum, res) => sum + (parseFloat(res.deposit_amount) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage orders, reservations, and restaurant operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Order Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservation Deposits</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalDeposits.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                        <TableCell>{order.customer_info?.name || 'Unknown'}</TableCell>
                        <TableCell>${parseFloat(order.total_amount).toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={order.payment_status === 'completed' ? 'default' : 'secondary'}>
                            {order.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              disabled={order.payment_status === 'completed'}
                            >
                              Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              disabled={order.payment_status === 'cancelled'}
                            >
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reservation ID</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Deposit</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-mono text-xs">{reservation.id.slice(0, 8)}...</TableCell>
                        <TableCell>
                          {new Date(reservation.reservation_date).toLocaleDateString()} at {reservation.reservation_time}
                        </TableCell>
                        <TableCell>{reservation.guests}</TableCell>
                        <TableCell>
                          <Badge variant={reservation.payment_status === 'completed' ? 'default' : 'secondary'}>
                            {reservation.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell>${parseFloat(reservation.deposit_amount || 0).toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                              disabled={reservation.payment_status === 'confirmed'}
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                              disabled={reservation.payment_status === 'cancelled'}
                            >
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
