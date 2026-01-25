"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, Calendar, Shield, Activity, Clock } from "lucide-react";
import { toast } from "react-toastify";

interface UserDetails {
  _id: string;
  name: string;
  fullName: string;
  email: string;
  mobile: string;
  role: "super_admin" | "admin" | "moderator" | "user";
  status: "active" | "suspended" | "deleted";
  activityStatus: "active" | "inactive";
  kycStatus: "pending" | "submitted" | "verified" | "rejected";
  createdAt: string;
  lastLoginAt?: string;
  lastLogoutAt?: string;
  parent?: {
    name: string;
    email: string;
    mobile: string;
  };
}

export default function UserDetailsPage() {
  useAuth({ requireAdmin: true });
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchUserDetails(params.id as string);
    }
  }, [params.id]);

  const fetchUserDetails = async (userId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/users/${userId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch user details");
      }
      
      const userData = await response.json();
      setUser(userData);
      toast.success("User details loaded successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-blue-100 text-blue-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "moderator":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "deleted":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getKycBadgeColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "submitted":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-600">{error || "User not found"}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">User Details</h1>
        <p className="text-lg text-gray-600">View detailed information about this user</p>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full p-3">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
                <p className="text-gray-600">@{user.name}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(user.role)}`}>
                <Shield className="w-4 h-4 mr-1" />
                {user.role.replace("_", " ").toUpperCase()}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(user.status)}`}>
                {user.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-3" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-3" />
                  <span>{user.mobile}</span>
                </div>
                {user.parent && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Referred by:</p>
                    <p className="text-sm text-gray-600">{user.parent.name}</p>
                    <p className="text-sm text-gray-500">{user.parent.email}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-3" />
                  <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Activity className="w-4 h-4 mr-3" />
                  <span>Activity: {user.activityStatus.toUpperCase()}</span>
                </div>
                {user.lastLoginAt && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-3" />
                    <span>Last Login: {new Date(user.lastLoginAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Account Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(user.status)}`}>
                  {user.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Activity Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                  user.activityStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.activityStatus.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">KYC Status</span>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getKycBadgeColor(user.kycStatus)}`}>
                  {user.kycStatus.replace("_", " ").toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
